import { INITIAL_ITEMS, INITIAL_CLAIMS } from './mockData';

const STORAGE_KEYS = {
  ITEMS: 'findit_items_v1',
  CLAIMS: 'findit_claims_v1',
  CURRENT_USER: 'findit_current_user_v1'
};

// Safe localStorage get with fallback
export const getStoredItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ITEMS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(INITIAL_ITEMS));
      return INITIAL_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_ITEMS;
  } catch (err) {
    console.warn('Could not read items from localStorage, falling back to mock data:', err);
    return INITIAL_ITEMS;
  }
};

export const saveStoredItems = (items) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
    return true;
  } catch (err) {
    console.error('Failed to save items to localStorage (quota or disabled):', err);
    return false;
  }
};

export const addItem = (newItem) => {
  const items = getStoredItems();
  const itemWithId = {
    ...newItem,
    id: `ITEM-${Date.now().toString().slice(-5)}`,
    status: 'active',
    isDemo: false
  };
  const updated = [itemWithId, ...items];
  saveStoredItems(updated);
  return itemWithId;
};

export const deleteItem = (itemId) => {
  const items = getStoredItems();
  const updated = items.filter((item) => item.id !== itemId);
  saveStoredItems(updated);
  return updated;
};

export const updateItemStatus = (itemId, newStatus) => {
  const items = getStoredItems();
  const updated = items.map((item) =>
    item.id === itemId ? { ...item, status: newStatus } : item
  );
  saveStoredItems(updated);
  return updated;
};

// CLAIMS STORAGE
export const getStoredClaims = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLAIMS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(INITIAL_CLAIMS));
      return INITIAL_CLAIMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CLAIMS;
  } catch (err) {
    console.warn('Could not read claims from localStorage:', err);
    return INITIAL_CLAIMS;
  }
};

export const saveStoredClaims = (claims) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(claims));
    return true;
  } catch (err) {
    console.error('Failed to save claims to localStorage:', err);
    return false;
  }
};

export const addClaim = (claimData) => {
  const claims = getStoredClaims();
  const newClaim = {
    ...claimData,
    claimId: `CLM-${Math.floor(10000 + Math.random() * 90000)}`,
    submittedDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    adminNote: 'Awaiting college security / admin desk review.'
  };
  const updated = [newClaim, ...claims];
  saveStoredClaims(updated);
  return newClaim;
};

export const updateClaimStatus = (claimId, newStatus, adminNote = '') => {
  const claims = getStoredClaims();
  const updated = claims.map((c) => {
    if (c.claimId === claimId) {
      return {
        ...c,
        status: newStatus,
        adminNote: adminNote || `Status updated to ${newStatus} by Campus Admin.`
      };
    }
    return c;
  });
  saveStoredClaims(updated);

  // If approved, optionally also update item status to claimed
  if (newStatus === 'Approved') {
    const targetClaim = updated.find((c) => c.claimId === claimId);
    if (targetClaim?.itemId) {
      updateItemStatus(targetClaim.itemId, 'claimed');
    }
  }
  return updated;
};

// Reset demo data helper for viva demonstration
export const resetToDemoData = () => {
  try {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(INITIAL_ITEMS));
    localStorage.setItem(STORAGE_KEYS.CLAIMS, JSON.stringify(INITIAL_CLAIMS));
    return true;
  } catch (e) {
    return false;
  }
};

// Helper: Compress uploaded image in browser canvas to prevent localStorage overflow
export const compressImage = (file, maxWidth = 800, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(ctx.canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};
