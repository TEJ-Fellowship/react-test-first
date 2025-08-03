## 🧪 **React Fundamentals Test — Super Simple Version**

### ✅ **You Are Provided With**

- A Vite + React project (already set up).
- CSS Modules provided.
- A `data.json` file with initial people data.

---

## 🎯 **What You Need to Do**

### 🔹 1. **Display Data (Right Side)**

- Read the JSON data and display a list of:

  - Name
  - Phone Number

- Style each item using the given CSS.

---

### 🔹 2. **Add New Person (Left Side)**

- Use two controlled `<input>` fields:

  - Name (text)
  - Phone (number or text)

- Below the inputs, add a **`Add` button**.
- When clicked, it should add the person to the list.

---

### 🔹 3. **Edit Person**

- Each person in the list should have an **Edit** button.
- When clicked:

  - Fill the input fields with the selected person's name and phone.
  - The `Add` button should change to `Update`.
  - On clicking `Update`, update the list.

---

### 🔹 4. **Delete Person**

- Each person should also have a **Delete** button to remove them.

---

### 🔹 5. **Search Functionality**

- Above the list, add a **search input**.
- It should live-filter the list by **name** as the user types.

---

### 🔹 6. **Show/Hide List**

- Add a button: `Show/Hide List`
- When clicked, toggle the visibility of the list on the right.

---

## 📂 Sample `data.json`

```json
[
  { "id": 1, "name": "Sita", "phone": "9800000001" },
  { "id": 2, "name": "Ram", "phone": "9800000002" }...
]
```

---

## 🧠 Concepts Being Tested

- `useState`
- Controlled inputs (with `value` and `onChange`)
- `map()` for list rendering
- `filter()` for search
- Conditional rendering (show/hide)
- CSS module usage
