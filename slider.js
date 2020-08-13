function Slider(slider) {
  if(!(slider instanceof Element)) {
    throw new Error('This is not an element');
  }

  // create some variables for working with the slider
  let current;
  let prev;
  let next;

  // select the element needed for the slider
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

    // Future functions
    function startSlider() {
      current = slider.querySelector('.current') || slides.firstElementChild;
      prev = current.previousElementSibling || slides.lastElementChild;
      next = current.nextElementSibling || slides.firstElementChild;
      console.log({current, prev, next});
    }

    function applyClasses() {
      current.classList.add('current');
      prev.classList.add('prev');
      next.classList.add('next');
    }

    function move(direction) {
      // first part of the move funct, delete all the classes from the element
      const classesToRemove = ['prev', 'current', 'next'];
      prev.classList.remove(...classesToRemove);
      current.classList.remove(...classesToRemove);
      next.classList.remove(...classesToRemove);
      if(direction === 'back') {
        // swap the variables when we go backwards
        [prev, current, next] = [prev.previousElementSibling || slides.lastElementChild, prev, current];
      } else {
        // do the opposite if go forward
        [prev, current, next] = [current, next, next.nextElementSibling || slides.firstElementChild];
      }
      applyClasses();
    }

    // when this slider is created, run the start slider function
    startSlider();
    applyClasses();

    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
