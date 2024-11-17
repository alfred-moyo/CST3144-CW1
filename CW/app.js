
let app = new Vue({
  el: '#app',
  data: {
    cart: [],
    selectedSubject: '',
    sortOption: 'asc',
    classList: list = [
                  { id: 1, title: 'Maths Tutoring - Year 10', description: 'Maths support for Year 10 students.', price: 30, spaces: 7, ratings: 5, subject: 'Maths', image: 'images/math-image.jpg' },
                  { id: 2, title: 'Science Class - Year 11', description: 'Science concepts for Year 11 students.', price: 25, spaces: 5, ratings: 5, subject: 'Science', image: 'images/science-image.jpg' },
                  { id: 3, title: 'English Literature - GCSE', description: 'In-depth analysis of English literature.', price: 35, spaces: 5, ratings: 5, subject: 'English', image: 'images/english-image.jpg' },
                  { id: 4, title: 'Music Lessons - Guitar', description: 'Learn to play the guitar from experienced instructors.', spaces: 8, price: 40, ratings: 4, subject: 'Music', image: 'images/music-image.jpg' },
                  { id: 5, title: 'Painting for Young Artists', description: 'A creative painting class for aspiring artists.', price: 22, spaces: 6, ratings: 4, subject: 'Arts', image: 'images/arts-image.jpg' },
                  { id: 6, title: 'Robotics and Coding - Level 1', description: 'Learn the basics of robotics and classListming.', price: 50, spaces: 10, ratings: 5, subject: 'Technology', image: 'images/technology-image.jpg' },
                  { id: 7, title: 'History of the UK - Key Stage 3', description: 'Explore the rich history of the United Kingdom.', price: 28, spaces: 5, ratings: 4, subject: 'History', image: 'images/history-image.jpg' },
                  { id: 8, title: 'Drama and Acting Workshop', description: 'An interactive workshop focused on acting skills.', price: 30, spaces: 10, ratings: 3, subject: 'Drama', image: 'images/drama-image.jpg' },
                  { id: 9, title: 'Physical Education and Fitness', description: 'A fun fitness class for kids to stay active.', price: 18, spaces: 12, ratings: 4, subject: 'Physical Education', image: 'images/physical_education-image.jpg' },
                  { id: 10, title: 'French Language Classes - Beginners', description: 'An introduction to French for beginners.', price: 35, spaces: 5, ratings: 4, subject: 'Languages', image: 'images/french-image.jpg' },
                  { id: 11, title: 'Photography for Beginners', description: 'Introduction to photography techniques and editing basics.', price: 45, spaces: 3, ratings: 4, subject: 'Photography', image: 'images/photography-image.jpg'},
                  { id: 12, title: 'Chemistry Experiments - Year 12', description: 'Hands-on chemistry experiments for Year 12 students.', price: 55, spaces: 5, ratings: 5, subject: 'Science', image: 'images/chemistry-image.jpg' }

    ],
    uniqueSubjects: ['Maths', 'Science', 'English'],
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
      }
  },
    computed: {
      uniqueSubjects() {
        return [...new Set(this.classList.map(item => item.subject))];
      },
      filteredAndSortedClasses() {
        let filtered = this.classList;
        if (this.selectedSubject) {
          filtered = filtered.filter(item => item.subject === this.selectedSubject);
        }
        if (this.sortOption === 'asc') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (this.sortOption === 'desc') {
          filtered.sort((a, b) => b.price - a.price);
        }
        return filtered;
      }
    }
    
});