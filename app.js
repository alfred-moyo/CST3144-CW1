
let app = new Vue({
  el: '#app',
  data: {
    // appURL: 'http://localhost:3000',
    appURL: 'https://mathisihub.onrender.com',
    cart: [], 
    classList: [],
    showPage: true,
    selectedSubject: '',
    sortOption: 'asc',
    searchQuery: '',
    uniqueSubjects: ['Maths', 'Science', 'English'],
    order: {
      name: "",
      address: "",
      city: "",
      tel: ""
    }
  },
  methods: {
      canAddtoCart(classList) {
        const cartCount = this.cart.filter(item => item.id === classList.id).length;
        return classList.spaces > cartCount;
      },
      
      addToCart(classList) {
        // Check if the item is already in the cart
        const existingItem = this.cart.find(item => item.id === classList.id);
      
        if (existingItem) {
          // If the item exists, increment its quantity
          existingItem.quantity += 1;
        } else {
          // If the item doesn't exist, add it to the cart with an initial quantity of 1
          this.cart.push({ ...classList, quantity: 1 });
        }
      },
      removeFromCart(classList) {
        const index = this.cart.findIndex(item => item.id === classList.id);
        if (index > -1) {
          if (this.cart[index].quantity > 1) {
            this.cart[index].quantity -= 1; // Decrement quantity if more than 1
          } else {
            this.cart.splice(index, 1); // Remove item if quantity is 1
          }
        }
      },
      cartCount(id) {
        // return this.cart.filter(item => item.id === id).length;
        const existingItem = this.cart.find(item => item.id === id);
        return existingItem ? existingItem.quantity : 0;
      },
      itemsLeft(classList) {
          return classList.spaces - this.cartCount(classList.id);
      },
      displayCheckout() {
        this.showPage = !this.showPage;
      },
      submitCheckOut() {
        alert("Order placed successfully!")
      },
      refreshLessons() {
        fetch(`${this.appURL}/lessons`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch programs. Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                this.classList = data;
                console.log("Lessons updated:", this.classList);
            })
            .catch(err => {
                console.error('Error fetching programs:', err);
            });
      },
      searchLessons() {
        if (!this.searchQuery.trim()) {
            this.refreshLessons();
            return;
        }

        fetch(`${this.appURL}/search?word=${(this.searchQuery)}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch search results. Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                this.classList = data; // Update programs with search results
                console.log("Search results:", data);
            })
            .catch(err => {
                console.error('Error searching programs:', err);
            });
        },
  },
    computed: {

      totalInCart(){
        return this.cart.reduce((total, item) => total + item.quantity, 0);
      },      
      filteredAndSortedClasses() {
        let filtered = this.classList;
        if (this.selectedSubject) {
          filtered = filtered.filter(item => item.subject === this.selectedSubject);
        }
        //Sorting
        if (this.sortOption === 'asc') {
          filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (this.sortOption === 'desc') {
          filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
        } else if (this.sortOption === 'price-asc') {
          filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (this.sortOption === 'price-desc') {
          filtered = filtered.sort((a, b) => b.price - a.price);
        }
        return filtered;
      },

      cartDetails() {
        return this.cart;
      },

      totalPrice() {
        return this.cartDetails.reduce((total, list) => total + list.price * list.quantity, 0);
      }
      
    },
    created() {
      fetch(`${this.appURL}/lessons`)
          .then( res => {
              if (!res.ok) {
              throw new Error (`Status: {res.status}`);
              }
              return res.json();
          })
          .then(data => {
              this.classList = Array.isArray(data) ? data : [];
              })
          .catch(err => {
              console.error('Error Fetching Programs', err);
              alert('Could not fetch class data. Please try again later.');
          });
      }
});