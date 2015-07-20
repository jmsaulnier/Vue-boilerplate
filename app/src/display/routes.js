'use strict';

/**
 * UI routes module.
 * @module ui/routes
 */

module.exports = {
  '/': {
    componentId: 'section-home',
    isDefault: true
  },
  '/contact': {
    componentId: 'section-contact'
  },
  options: {
    hashbang: true
  }
};
