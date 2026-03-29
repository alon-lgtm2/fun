// ===== FIREBASE AUTH & PROFILE MANAGEMENT =====
// Replace the firebaseConfig values with your Firebase project config

const firebaseConfig = {
  apiKey: "AIzaSyAa-L7PUiri8B9fKPMzB8QUAPhBN1umgTg",
  authDomain: "az-ma-7480e.firebaseapp.com",
  projectId: "az-ma-7480e",
  storageBucket: "az-ma-7480e.firebasestorage.app",
  messagingSenderId: "925765602538",
  appId: "1:925765602538:web:7cd04c790827588dc35b93"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Keep user signed in across sessions
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// ===== AUTH STATE =====
let currentUser = null;
let userProfile = null;
let _authCheckedOnce = false; // tracks if this is the initial auth check vs a fresh login

auth.onAuthStateChanged(async (user) => {
  const isFreshLogin = _authCheckedOnce && !currentUser && !!user;
  _authCheckedOnce = true;
  currentUser = user;
  if (user) {
    // Update last login
    const userRef = db.collection('users').doc(user.uid);
    const doc = await userRef.get();
    if (doc.exists) {
      userProfile = doc.data();
      userRef.update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        loginCount: firebase.firestore.FieldValue.increment(1)
      });
      onAuthReady(true, false, isFreshLogin);
    } else {
      // First-time user — needs profile completion
      userProfile = {
        name: user.displayName || '',
        firstName: (user.displayName || '').split(' ')[0] || '',
        lastName: (user.displayName || '').split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        city: '',
        kidsAges: '',
        whatsapp: '',
        heardFrom: '',
        expectations: '',
        disclaimerAccepted: false,
        favorites: [],
        loginCount: 1,
        totalTimeSpent: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      };
      onAuthReady(true, true, isFreshLogin);
    }
  } else {
    userProfile = null;
    onAuthReady(false, false, false);
  }
});

// ===== IN-APP BROWSER DETECTION =====
function isFacebookBrowser() {
  const ua = navigator.userAgent || '';
  return /FBAN|FBAV|FB_IAB|Instagram/i.test(ua);
}

function openInSystemBrowser() {
  const url = window.location.href;
  const ua = navigator.userAgent || '';

  // Android: try intent to open in Chrome
  if (/android/i.test(ua)) {
    window.location.href = 'intent://' + url.replace(/^https?:\/\//, '') +
      '#Intent;scheme=https;package=com.android.chrome;end';
    // Fallback after a short delay if intent didn't work
    setTimeout(() => { window.open(url, '_blank'); }, 500);
    return;
  }

  // iOS & other: open in new window (triggers "Open in Safari" on iOS)
  window.open(url, '_blank');
}

function showFacebookBrowserModal() {
  const modal = document.getElementById('fbBrowserModal');
  if (modal) modal.classList.add('open');
}

function closeFacebookBrowserModal() {
  const modal = document.getElementById('fbBrowserModal');
  if (modal) modal.classList.remove('open');
}

// ===== SIGN IN =====
function signInWithGoogle() {
  // If in Facebook/Instagram in-app browser, redirect to system browser
  if (isFacebookBrowser()) {
    showFacebookBrowserModal();
    return;
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  auth.signInWithPopup(provider).catch((error) => {
    console.error('Sign-in error:', error);
    if (error.code !== 'auth/popup-closed-by-user') {
      alert('שגיאה בהתחברות. אנא נסו שנית.');
    }
  });
}

function signOut() {
  auth.signOut();
}

// ===== PROFILE =====
async function saveProfile(profileData) {
  if (!currentUser) return;
  const userRef = db.collection('users').doc(currentUser.uid);
  const data = {
    ...profileData,
    name: profileData.name || currentUser.displayName || '',
    email: profileData.email || currentUser.email || '',
    photoURL: currentUser.photoURL || '',
    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
  };
  // Check if doc exists
  const doc = await userRef.get();
  if (doc.exists) {
    await userRef.update(data);
  } else {
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await userRef.set(data);
  }
  userProfile = { ...userProfile, ...data };
}

// ===== FAVORITES SYNC =====
async function syncFavorites(localFavorites) {
  if (!currentUser || !userProfile) return;
  // Merge local favorites with cloud favorites
  const cloudFavs = userProfile.favorites || [];
  const merged = [...new Set([...cloudFavs, ...localFavorites])];
  await db.collection('users').doc(currentUser.uid).update({ favorites: merged });
  userProfile.favorites = merged;
  return merged;
}

async function addFavorite(eventId) {
  if (!currentUser) return;
  const favs = userProfile.favorites || [];
  if (!favs.includes(eventId)) {
    favs.push(eventId);
    await db.collection('users').doc(currentUser.uid).update({ favorites: favs });
    userProfile.favorites = favs;
  }
}

async function removeFavorite(eventId) {
  if (!currentUser) return;
  const favs = (userProfile.favorites || []).filter(id => id !== eventId);
  await db.collection('users').doc(currentUser.uid).update({ favorites: favs });
  userProfile.favorites = favs;
}

// ===== SESSION TRACKING =====
let _sessionStart = Date.now();

function _flushSessionTime() {
  if (!currentUser) return;
  const elapsed = Math.round((Date.now() - _sessionStart) / 1000); // seconds
  if (elapsed < 2) return; // skip trivial durations
  const userRef = db.collection('users').doc(currentUser.uid);
  // Use sendBeacon-friendly approach: fire-and-forget update
  userRef.update({
    totalTimeSpent: firebase.firestore.FieldValue.increment(elapsed)
  }).catch(() => {});
  _sessionStart = Date.now(); // reset for next flush
}

// Flush on page unload
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') _flushSessionTime();
});
window.addEventListener('beforeunload', _flushSessionTime);

// ===== UI HELPERS =====
// These are called by the page-specific code

function onAuthReady(isLoggedIn, needsProfileCompletion, isFreshLogin) {
  // Update nav auth button
  const authBtn = document.getElementById('authBtn');
  const profileBtn = document.getElementById('profileBtn');
  const authBtnMobile = document.getElementById('authBtnMobile');
  const authBtnNav = document.getElementById('authBtnNav');
  const profileBtnNav = document.getElementById('profileBtnNav');
  const authBtnHero = document.getElementById('authBtnHero');
  const profileBtnHero = document.getElementById('profileBtnHero');

  if (isLoggedIn) {
    if (authBtn) authBtn.style.display = 'none';
    if (authBtnMobile) authBtnMobile.style.display = 'none';
    if (authBtnNav) authBtnNav.style.display = 'none';
    if (authBtnHero) authBtnHero.style.display = 'none';
    if (profileBtn) {
      profileBtn.style.display = 'flex';
      const avatar = profileBtn.querySelector('.profile-avatar');
      if (avatar && currentUser.photoURL) {
        avatar.style.backgroundImage = `url(${currentUser.photoURL})`;
        avatar.textContent = '';
      } else if (avatar) {
        avatar.textContent = (currentUser.displayName || currentUser.email || '?')[0];
      }
    }
    if (profileBtnNav) {
      profileBtnNav.style.display = 'flex';
      const avatarNav = profileBtnNav.querySelector('.profile-avatar-nav');
      if (avatarNav && currentUser.photoURL) {
        avatarNav.style.backgroundImage = `url(${currentUser.photoURL})`;
        avatarNav.textContent = '';
      } else if (avatarNav) {
        avatarNav.textContent = (currentUser.displayName || currentUser.email || '?')[0];
      }
    }
    if (profileBtnHero) {
      profileBtnHero.style.display = 'flex';
      const avatarHero = profileBtnHero.querySelector('.profile-avatar-hero');
      if (avatarHero && currentUser.photoURL) {
        avatarHero.style.backgroundImage = `url(${currentUser.photoURL})`;
        avatarHero.textContent = '';
      } else if (avatarHero) {
        avatarHero.textContent = (currentUser.displayName || currentUser.email || '?')[0];
      }
    }

    // Page-specific auth callback
    if (typeof onUserLoggedIn === 'function') {
      onUserLoggedIn(needsProfileCompletion, isFreshLogin);
    }
  } else {
    if (authBtn) authBtn.style.display = 'flex';
    if (authBtnMobile) authBtnMobile.style.display = 'flex';
    if (authBtnNav) authBtnNav.style.display = 'flex';
    if (authBtnHero) authBtnHero.style.display = 'flex';
    if (profileBtn) profileBtn.style.display = 'none';
    if (profileBtnNav) profileBtnNav.style.display = 'none';
    if (profileBtnHero) profileBtnHero.style.display = 'none';

    if (typeof onUserLoggedOut === 'function') {
      onUserLoggedOut();
    }
  }
}
