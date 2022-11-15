function NewArrayByCount(array) {
  let array_null = [];
  array.forEach((element) => {
    array_null.push(0);
  });

  return array_null;
}

export default NewArrayByCount;
