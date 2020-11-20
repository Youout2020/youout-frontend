export const validateLength = (min, max, name, value) => {
  if (value.length < min) {
    return `${name} should be at least ${min} characters`;
  }

  if (value.length > max) {
    return `${name} should be under ${max} characters`;
  }

  return '';
};

export const validateType = (value) => {
  const spaceRegType = /\s/;
  const englishRegType = /^[A-Za-z0-9+]*$/;

  if (value.search(spaceRegType) !== -1) {
    return 'Please enter without spaces';
  }

  if (!englishRegType.test(value)) {
    return 'Only English can be entered';
  }

  return '';
};
