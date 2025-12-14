// Visual Indicators and UI Management for Patient List MPage Template
(function(window) {
    'use strict';
    
    /**
     * localStorage utilities with error handling
     */
    function getStorageValue(key, defaultValue) {
        try {
            const stored = localStorage.getItem(key);
            console.log(`[VisualIndicators] localStorage.getItem('${key}') = '${stored}'`);
            
            if (stored === null) {
                console.log(`[VisualIndicators] No stored value found for '${key}', using default: ${defaultValue}`);
                return defaultValue;
            }
            
            // Parse boolean values
            if (stored === 'true') return true;
            if (stored === 'false') return false;
            
            // Parse numbers  
            if (!isNaN(stored) && stored !== '') {
                return parseFloat(stored);
            }
            
            // Return string as-is
            console.log(`[VisualIndicators] Using stored string value for '${key}': '${stored}'`);
            return stored;
            
        } catch (error) {
            console.warn(`[VisualIndicators] localStorage error for '${key}':`, error.message);
            console.log(`[VisualIndicators] Falling back to default value: ${defaultValue}`);
            return defaultValue;
        }
    }
    
    function setStorageValue(key, value) {
        try {
            const stringValue = String(value);
            localStorage.setItem(key, stringValue);
            console.log(`[VisualIndicators] localStorage.setItem('${key}', '${stringValue}') - SUCCESS`);
            return true;
        } catch (error) {
            console.error(`[VisualIndicators] localStorage.setItem('${key}') FAILED:`, error.message);
            console.warn(`[VisualIndicators] localStorage may not be available in this environment`);
            return false;
        }
    }

    /**
     * Reload patient lists with current configuration
     */
    function reloadPatientLists() {
        try {
            // Check if PatientListApp is available
            if (window.PatientListApp && window.PatientListApp.services && window.PatientListApp.services.patientList) {
                console.log('[VisualIndicators] Attempting to reload patient lists...');
                
                // Clear current table
                if (window.clearPatientTable && typeof window.clearPatientTable === 'function') {
                    window.clearPatientTable();
                }
                
                // Reload patient lists using main app function
                if (window.loadPatientLists && typeof window.loadPatientLists === 'function') {
                    window.loadPatientLists();
                } else {
                    console.warn('[VisualIndicators] loadPatientLists function not available globally');
                    console.log('[VisualIndicators] Please refresh page for configuration to take full effect');
                }
            } else {
                console.warn('[VisualIndicators] PatientListApp not fully initialized yet');
                console.log('[VisualIndicators] Configuration change will take effect on next patient list load');
            }
        } catch (error) {
            console.error('[VisualIndicators] Error reloading patient lists:', error.message);
            console.log('[VisualIndicators] Please refresh page for configuration to take full effect');
        }
    }

    /**
     * Unified visual indicator for all active modes
     */
    function updateUnifiedIndicator() {
        // Remove any existing indicators
        removeOldIndicators();
        
        const isSimulator = window.SIMULATOR_CONFIG?.enabled;
        const impersonateId = window.USER_CONTEXT_CONFIG?.impersonatePersonId;
        
        // Build status message based on active modes
        let message = '';
        let backgroundColor = '#333333'; // Default gray
        let borderColor = '#6b7280';
        
        if (isSimulator && impersonateId) {
            message = `🚨 SIMULATOR MODE + IMPERSONATING USER: ${impersonateId}`;
            backgroundColor = '#ff0000'; // Red for simulator (higher priority)
            borderColor = '#ff0000';
        } else if (isSimulator) {
            message = '🚨 SIMULATOR MODE - USING MOCK DATA';
            backgroundColor = '#ff0000'; // Red
            borderColor = '#ff0000';
        } else if (impersonateId) {
            message = `👤 IMPERSONATING USER: ${impersonateId}`;
            backgroundColor = '#ff8c00'; // Orange
            borderColor = '#ff8c00';
        }
        
        if (message) {
            // Create unified indicator as badge (top-right corner)
            const indicator = document.createElement('div');
            indicator.id = 'unified-mode-indicator';
            indicator.innerHTML = message;
            indicator.style.cssText = [
                'position: fixed',
                'top: 10px',
                'right: 10px',
                'background: ' + backgroundColor,
                'color: #ffffff',
                'text-align: center',
                'padding: 6px 12px',
                'font-weight: bold',
                'font-family: monospace',
                'font-size: 11px',
                'z-index: 999999',
                'box-shadow: 0 2px 8px rgba(0,0,0,0.5)',
                'border-radius: 4px',
                'border: 2px solid ' + borderColor
            ].join(';');

            document.body.appendChild(indicator);
            
            // Add colored border to header for additional visibility
            const header = document.getElementById('header');
            if (header) {
                header.style.borderTop = `4px solid ${borderColor}`;
                header.style.borderBottom = `2px solid ${borderColor}`;
                if (impersonateId && !isSimulator) {
                    header.style.borderLeft = `6px solid ${borderColor}`;
                }
            }
            
            console.log(`[VisualIndicators] Unified indicator displayed: ${message}`);
        }
    }
    
    function removeOldIndicators() {
        // Remove old separate indicators if they exist
        const simulatorIndicator = document.getElementById('simulator-mode-indicator');
        const impersonationIndicator = document.getElementById('impersonation-indicator');
        const unifiedIndicator = document.getElementById('unified-mode-indicator');
        
        if (simulatorIndicator) simulatorIndicator.remove();
        if (impersonationIndicator) impersonationIndicator.remove();
        if (unifiedIndicator) unifiedIndicator.remove();
        
        // Clear all header borders
        const header = document.getElementById('header');
        if (header) {
            header.style.borderTop = '';
            header.style.borderBottom = '';
            header.style.borderLeft = '';
        }
        
        console.log('[VisualIndicators] All visual indicators cleared');
    }
    
    // Expose functions to global scope
    window.updateUnifiedIndicator = updateUnifiedIndicator;
    window.reloadPatientLists = reloadPatientLists;
    window.setStorageValue = setStorageValue;
    window.getStorageValue = getStorageValue;
    
})(window);