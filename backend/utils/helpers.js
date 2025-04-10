// backend/utils/helpers.js
export const log = (label, data) => {
    console.log(`🔍 ${label}:`, JSON.stringify(data, null, 2));
  };
  