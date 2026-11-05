import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ClaimModal } from './components/ClaimModal';

// Pages
import { Home } from './pages/Home';
import { Items } from './pages/Items';
import { ItemDetails } from './pages/ItemDetails';
import { ReportLost } from './pages/ReportLost';
import { ReportFound } from './pages/ReportFound';
import { MyClaims } from './pages/MyClaims';
import { MyReports } from './pages/MyReports';
import { About } from './pages/About';

// Storage
import {
  getStoredItems,
  addItem,
  deleteItem,
  updateItemStatus,
  getStoredClaims,
  addClaim,
  updateClaimStatus,
  resetToDemoData
} from './data/storage';

export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemsPageFilter, setItemsPageFilter] = useState({});
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [itemToClaim, setItemToClaim] = useState(null);
  const [toast, setToast] = useState(null);

  // Initialize data on component mount
  useEffect(() => {
    const loadedItems = getStoredItems();
    const loadedClaims = getStoredClaims();
    setItems(loadedItems);
    setClaims(loadedClaims);
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Navigation handler
  const navigate = (view, params = {}) => {
    if (view === 'item-details' && params.id) {
      setSelectedItemId(params.id);
    }

    if (view === 'items') {
      setItemsPageFilter(params);
    } else {
      setItemsPageFilter({});
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Item (from Report Lost or Report Found)
  const handleAddItem = (newItemData) => {
    const createdItem = addItem(newItemData);
    setItems(getStoredItems());
    showToast(
      `Successfully published ${createdItem.type === 'found' ? 'Found' : 'Lost'} listing for "${createdItem.name}"!`,
      'success'
    );
    navigate('items', { type: createdItem.type });
  };

  // Delete Listing
  const handleDeleteItem = (itemId) => {
    const updated = deleteItem(itemId);
    setItems(updated);
    showToast('Listing removed successfully.', 'info');
  };

  // Toggle item status (e.g. active <-> returned)
  const handleToggleItemStatus = (itemId, newStatus) => {
    const updated = updateItemStatus(itemId, newStatus);
    setItems(updated);
    showToast(
      `Item status updated to ${newStatus === 'returned' ? 'Reunited / Returned' : 'Active'}!`,
      'success'
    );
  };

  // Open Claim modal
  const handleOpenClaim = (item) => {
    setItemToClaim(item);
    setClaimModalOpen(true);
  };

  // Submit Claim
  const handleSubmitClaim = (claimData) => {
    const createdClaim = addClaim(claimData);
    setClaims(getStoredClaims());
    showToast(
      `Claim #${createdClaim.claimId} submitted successfully! Status: Pending review.`,
      'success'
    );
    navigate('my-claims');
  };

  // Update Claim status (by evaluator/admin)
  const handleUpdateClaimStatus = (claimId, newStatus, adminNote) => {
    const updatedClaims = updateClaimStatus(claimId, newStatus, adminNote);
    setClaims(updatedClaims);
    // Refresh items as well in case claim approval updated item status
    setItems(getStoredItems());
    showToast(`Claim #${claimId} status updated to "${newStatus}"!`, 'info');
  };

  // Reset to Demo Data helper
  const handleResetDemoData = () => {
    if (window.confirm('Reset all portal listings and claims back to initial college sample data?')) {
      resetToDemoData();
      setItems(getStoredItems());
      setClaims(getStoredClaims());
      showToast('All data has been reset to initial college sample items.', 'info');
      navigate('home');
    }
  };

  // Category selection shortcut from Home
  const handleCategorySelect = (categoryName) => {
    navigate('items', { category: categoryName });
  };

  // View details shortcut
  const handleViewDetails = (id) => {
    setSelectedItemId(id);
    navigate('item-details', { id });
  };

  // Currently viewed item object
  const selectedItem = items.find((i) => i.id === selectedItemId);

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        navigate={navigate}
        claimsCount={claims.filter((c) => c.status === 'Pending').length}
      />

      {/* Main Page Content */}
      <main className="main-content">
        {currentView === 'home' && (
          <Home
            items={items}
            navigate={navigate}
            onSelectCategory={handleCategorySelect}
            onViewDetails={handleViewDetails}
          />
        )}

        {currentView === 'items' && (
          <Items
            items={items}
            initialFilter={itemsPageFilter}
            onViewDetails={handleViewDetails}
            navigate={navigate}
          />
        )}

        {currentView === 'item-details' && (
          <ItemDetails
            item={selectedItem}
            onBack={() => navigate('items')}
            onOpenClaim={handleOpenClaim}
            navigate={navigate}
          />
        )}

        {currentView === 'report-lost' && (
          <ReportLost
            onSubmitItem={handleAddItem}
            navigate={navigate}
          />
        )}

        {currentView === 'report-found' && (
          <ReportFound
            onSubmitItem={handleAddItem}
            navigate={navigate}
          />
        )}

        {currentView === 'my-claims' && (
          <MyClaims
            claims={claims}
            onUpdateClaimStatus={handleUpdateClaimStatus}
            onViewItemDetails={handleViewDetails}
            navigate={navigate}
          />
        )}

        {currentView === 'my-reports' && (
          <MyReports
            items={items}
            onDeleteListing={handleDeleteItem}
            onToggleStatus={handleToggleItemStatus}
            onViewDetails={handleViewDetails}
            navigate={navigate}
          />
        )}

        {currentView === 'about' && (
          <About navigate={navigate} />
        )}
      </main>

      {/* Claim Modal */}
      <ClaimModal
        item={itemToClaim}
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        onSubmitClaim={handleSubmitClaim}
      />

      {/* Toast Notification Banner */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Professional Footer */}
      <Footer navigate={navigate} onResetDemo={handleResetDemoData} />
    </div>
  );
}

export default App;
