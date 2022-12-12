function NewArrayByCount() {
	let array_null = [];
	for (let i = 0; i < 10000; i++) {
		array_null.push(0);
	}
	return array_null;
}

export default NewArrayByCount;
