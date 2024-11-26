
let app = new Vue({
  el: '#app',
  data: {
    appURL: 'http://localhost:3000',
    //  'https://mathisihub.onrender.com',
    cart: [], 
    classList: [],
    showPage: true,
    selectedSubject: '',
    sortOption: 'asc',
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
        if (this.canAddtoCart(classList)) {
          this.cart.push(classList);
        }
      },
      removeFromCart(classList) {
        const index = this.cart.findIndex(item => item.id === classList.id);
        if (index > -1) this.cart.splice(index, 1);
      },
      cartCount(id) {
        return this.cart.filter(item => item.id === id).length;
      },
      itemsLeft(classList) {
          return classList.spaces - this.cartCount(classList.id);
      },
      displayCheckout() {
        this.showPage = !this.showPage;
      },
      submitCheckOut() {
        alert("Order placed successfully!")
      }
  },
    computed: {
      // uniqueSubjects() {
      //   return [...new Set(this.classList.map(item => item.subject))];
      // },
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
        return this.cartDetails.reduce((total, list) => total + list.price, 0);
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