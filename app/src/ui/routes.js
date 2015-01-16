'use strict';

/**
 * UI routes module.
 * @module ui/routes
 */

module.exports = {
  '/': {
    componentId: 'mHome',
    isDefault: true
  },
  '/contact': {
    componentId: 'mContact'
  },
  options: {
    hashbang: true
  }
};
