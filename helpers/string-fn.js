function splitName(name) {
  if (name) {
    const indexOfSpace = name.indexOf(" ");
    if (indexOfSpace > 0) {
      const firstName = name.substring(0, indexOfSpace);
      const lastName = name.substring(indexOfSpace + 1);
      return [firstName, lastName];
    }
    return [name, ""];
  }
  return [];
}

module.exports = {
  splitName,
};
