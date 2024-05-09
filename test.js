// Sample JSON array
const json_array = [
  { "id": 1, "name": "John" },
  { "id": 2, "name": "Jane" },
  { "id": 3, "name": "Bob" },
  { "id": 4, "name": "Alice" },
  { "id": 5, "name": "John" } // Note: Duplicate name
];

// Attribute to extract
const attribute = "name";

// Set to store the extracted values
const attributeSet = new Set();

// Extracting attribute values and adding them to the set
json_array.forEach((item) => {
  if (item[attribute]) {
    attributeSet.add(item[attribute]);
  }
});

console.log([...attributeSet]);
