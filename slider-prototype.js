function Slider(slider) {
  if(!(slider instanceof Element)) {
    throw new Error('This is not an element');
  }

  // create some variables for working with the slider

  this.slider = slider;
  // select the element needed for the slider
  this.slides = this.slider.querySelector('.slides');
  const prevButton = this.slider.querySelector('.goToPrev');
  const nextButton = this.slider.querySelector('.goToNext');

    // when this slider is created, run the start slider function
    this.startSlider();
    this.applyClasses();

    prevButton.addEventListener('click', () => this.move('back'));
    nextButton.addEventListener('click', () => this.move());
}

    // Future functions
    Slider.prototype.startSlider = function() {
      this.current = this.slider.querySelector('.current') || this.slides.firstElementChild;
      this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
      this.next = this.current.nextElementSibling || this.slides.firstElementChild;
      // console.log({current, prev, next});
    }

    Slider.prototype.applyClasses = function() {
      this.current.classList.add('current');
      this.prev.classList.add('prev');
      this.next.classList.add('next');
    }

    Slider.prototype.move = function(direction) {
      // first part of the move funct, delete all the classes from the element
      const classesToRemove = ['prev', 'current', 'next'];
      this.prev.classList.remove(...classesToRemove);
      this.current.classList.remove(...classesToRemove);
      this.next.classList.remove(...classesToRemove);
      if(direction === 'back') {
        // swap the variables when we go backwards
        [this.prev, this.current, this.next] = [this.prev.previousElementSibling || this.slides.lastElementChild, this.prev, this.current];
      } else {
        // do the opposite if go forward
        [this.prev, this.current, this.next] = [this.current, this.next, this.next.nextElementSibling || this.slides.firstElementChild];
      }
      this.applyClasses();
    }

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);

window.dogSlider = dogSlider;
window.mySlider = dogSlider;
window.addEventListener('keyup', function(e) {
  if(e.key === 'ArrowRight') {
    mySlider.move();
    dogSlider.move();
  }
  if(e.key === 'ArrowLeft') {
    mySlider.move('back');
    dogSlider.move('back');
  }
})
