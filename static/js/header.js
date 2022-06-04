const getElement = (id) => {
  let ele = document.getElementById(id)
  if (ele) {
    return ele;
  }
  ele = document.getElementsByName(id);
  if (ele && ele.length > 0) {
    return ele[0]
  }
  ele = document.querySelector('.' + id);
  if (ele) {
    return ele;
  }
  ele = document.querySelector('#' + id);
  if (ele) {
    return ele;
  }
  return null
}

const showElement = (className, isShow) => {
  const ele = getElement(className);
  if (!ele) {
    return;
  }
  if (isShow) {
    ele.classList.add('show-element')
    ele.classList.remove('hide-element')
  } else {
    ele.classList.remove('show-element')
    ele.classList.add('hide-element')
  }
}


const closeDialog = () => {
  showElement('reminds', false)
  showElement('music-dialog', false)
  showElement('keyword-dialog', false)
  showElement('star-dialog', false)
}

class TimeHelper {
  init () {
    this._stop = false;
    window.a = this;
    this.div_countDown = getElement('countDown')

    let starDialog = getElement('starDialog');
    if (starDialog) {
      starDialog.addEventListener('click', this.startDialog.bind(this))
    }
    let star_dialog = getElement('star-dialog ');
    if (star_dialog) {
      star_dialog.addEventListener('click', this.noop.bind(this))
    }

    let stop = getElement('div_stop')
    if (stop) {
      stop.addEventListener('click', this.stop.bind(this))
    }
    let study = getElement('div_study');
    if (study) {
      study.addEventListener('click', this.study.bind(this));
    }

    let break1 = getElement('div_break')
    if (break1) {
      break1.addEventListener('click', this.break.bind(this))
    }
    let reset = getElement('div_reset')
    if (reset) {
      reset.addEventListener('click', this.reset.bind(this))
    }

  }

  noop (e) {
    e.stopPropagation();
  }

  stop (e) {
    console.log('stop', e)
    this._stop = !this._stop;
    // e.target.innerText = this._stop ? 'Start' : 'Stop'

    if (!this._stop) {
      e.target.innerText = 'Stop'
      this.countDown();
    } else {
      e.target.innerText = 'Start';
    }
    console.log(' e.target.innerText:', e.target.innerText, this._stop);

  }

  study () {
    console.log('study', this)
    this.div_countDown = getElement('countDown')
    const date = new Date();
    this.endDate = date.getTime() + 1000 * 60 * 25;
    this._stop = false;
    this.countDown();
  }

  break () {
    console.log('break', this)
    this.div_countDown = getElement('countDown')
    const date = new Date();
    this.endDate = date.getTime() + 1000 * 60 * 5;
    this._stop = false;
    this.countDown();
  }
  reset () {
    this._stop = true;
    this.endDate = 0;
    this.div_countDown.innerText = "00:00:00"
  }

  countDown () {
    if (this._stop) {
      return;
    }
    getElement('div_stop').innerText = "Stop"
    const nowtime = new Date();
    const lefttime = this.endDate - nowtime.getTime();
    if (lefttime < 0) {
      return;
    }

    const lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24);
    const leftm = Math.floor(lefttime / (1000 * 60) % 60);
    const lefts = Math.floor(lefttime / 1000 % 60);

    const arr = [];
    if (lefth < 10) {
      arr.push('0' + lefth)
    } else {
      arr.push(lefth)
    }
    if (leftm < 10) {
      arr.push('0' + leftm)
    } else {
      arr.push(leftm)
    }
    if (lefts < 10) {
      arr.push('0' + lefts)
    } else {
      arr.push(lefts)
    }

    this.div_countDown.innerText = arr.join(':')

    setTimeout(() => {
      this.countDown()
    }, 1000)
  }


  startDialog (e) {
    e.stopPropagation();
    closeDialog();
    showElement('star-dialog', true)
  }
}

function addClickNoop (idName) {
  const element = getElement(idName);
  if (!element) {
    return;
  }
  element.addEventListener('click', (e) => {
    e.stopPropagation();
  })
}

class Header {

  init () {

    console.log('enter header---')
    window.addEventListener('click', (e) => {
      closeDialog()
    })

    addClickNoop('reminds');
    addClickNoop('music-dialog');
    addClickNoop('keyword-dialog');

    const schedule = getElement('schedule');
    if (schedule) {
      schedule.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDialog();
        showElement('reminds', true)
      })
    }

    const music_note = getElement('music_note');
    if (music_note) {
      music_note.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('--->music-dialog')
        closeDialog();
        showElement('music-dialog', true)
      })
    }

    const keywordDialog = getElement('keywordDialog');
    if (keywordDialog) {
      keywordDialog.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('--->keyword-dialog')
        closeDialog();
        showElement('keyword-dialog', true)
      })
    }

    new TimeHelper().init();
  }
}


function showSchedule (e) {
  window.event.stopPropagation();
}


class KeyValue {

  getValue (key) {
    const val = localStorage.getItem(key)
    if (!val) {
      return null;
    }
    return JSON.parse(val)
  }

  setValue (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }


  getBoard () {
    const bMap = this.getValue('board')
    return bMap;
  }

  setBorad (val) {
    this.setValue('board', val)
  }

  getKanban () {
    const bMap = this.getValue('kanban')
    return bMap;
  }

  setKanban (val) {
    this.setValue('kanban', val)
  }


}


window.__Header__ = new Header();

window.onload = function () {
  window.__Header__.init();
}