/**
 * Calculate offset for overlapping markers
 * 
 * This function calculates the offset for markers to avoid overlap when 
 * multiple members have the same or very close coordinates.
 * 
 * @param {number} index - The index of the current member in the group.
 * @param {number} total - The total number of members in the group.
 * @returns {Array} An array containing the x and y offsets.
 */
export const calculateOffset = (index, total) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 2;
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    return [offsetX, offsetY];
  };
  