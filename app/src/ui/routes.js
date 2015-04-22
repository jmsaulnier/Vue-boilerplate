'use strict';

/**
 * UI routes module.
 * @module ui/routes
 */

module.exports = {
  '/': {
    componentId: 'm-home',
    isDefault: true
  },
  '/contact': {
    componentId: 'm-contact'
  },
  options: {
    hashbang: true
  }
};
