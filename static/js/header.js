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


class ClassAssessment {
  constructor() {
    this.kv = new KeyValue();
    // this.kv.getBoard() || 
    this.list = [
      { title: 'Assessment 1', brief: 'xxxx xxxx xxxx xxxx', start: '11:00(Syndey Time) 9 April,2022', dueDate: '23:59:00(Syndey Time) 10 April,2022' },
      { title: 'Assessment 2', brief: 'xxxx xxxx xxxx xxxx', start: '12:00(Syndey Time) 9 April,2022', dueDate: '23:59:00(Syndey Time) 10 April,2022' },
      { title: 'Assessment 3', brief: 'xxxx xxxx xxxx xxxx', start: '13:00(Syndey Time) 9 April,2022', dueDate: '23:59:00(Syndey Time) 10 April,2022' },
      { title: 'Assessment 4', brief: 'xxxx xxxx xxxx xxxx', start: '14:00(Syndey Time) 9 April,2022', dueDate: '23:59:00(Syndey Time) 10 April,2022' },
      { title: 'Assessment 5', brief: 'xxxx xxxx xxxx xxxx', start: '15:00(Syndey Time) 9 April,2022', dueDate: '23:59:00(Syndey Time) 10 April,2022' },
    ]
    this.kv.setBorad(this.list)
  }

  handleAdd (a, index) {
    console.log(a, index)
    // const items = this.kv.getBoard() || [];
    // items.push({ ...this.list[index], create_time: new Date() })

    const row = this.list[index];
    const kanban = this.kv.getKanban();
    const exists = kanban[index].items.filter((p) => p.title == row.title)
    if (exists.length > 0) {
      alert('exists')
      return
    }
    kanban[index].items.push({ title: row.title, introduction: row.brief, begin: row.start, end: row.dueDate });
    this.kv.setKanban(kanban)
    alert('add success')
  }
  handleFinish (a, index) {
    console.log('finish', a, index)
    const row = this.list[index];
    const kanban = this.kv.getKanban();
    const exists = kanban[index].items.find((p) => p.title == row.title)
    if (!exists) {
      alert('not exists')
      return;
    }
    exists.status = 2;

    this.kv.setKanban(kanban)
    alert('finish')
  }
  initData () {

    const ele = getElement('class-page-1');
    let html = ''
    this.list.forEach((item, i) => {
      html += `
      <div class="items mb-30 mt-10">
        <h6> ${item.title} </h6>
        <div class="row">
          <div class="col-md-9">

            <div>Brief: ${item.brief}</div>
            <div>Start: ${item.start}</div>
            <div>Due date: ${item.dueDate}.</div>
          </div>
          <div class="col-md-3 mt-4">
            <div class="fs-sm ml-15 mr-15 bg-dark b-r-40 text-white text-center" data="${JSON.stringify(item)}" onclick="__ClassAssessment__.handleAdd(this,${i})">Add to Boand</div>
            <div class="text-center mt-10" onclick="__ClassAssessment__.handleFinish(this,${i})">
              <svg t="1653069694602" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2803" width="32" height="32"><path d="M512 85.333333c282.752 0 426.666667 143.914667 426.666667 426.666667s-143.914667 426.666667-426.666667 426.666667S85.333333 794.752 85.333333 512 229.248 85.333333 512 85.333333z m211.2 293.504a42.666667 42.666667 0 0 0-60.330667 0l-211.2 211.2-90.538666-90.538666a42.666667 42.666667 0 0 0-60.330667 60.330666L421.546667 680.533333a42.666667 42.666667 0 0 0 60.330666 0l241.365334-241.365333a42.666667 42.666667 0 0 0 0-60.330667z" fill="#000000" p-id="2804"></path></svg>
            </div>
          </div>
        </div>
      </div>
      `
      ele.innerHTML = html;
      // console.log(html, ele);
    })
  }
}


class KanbanBorad {

  constructor() {

    this.kv = new KeyValue();

    this.list = this.kv.getKanban() || [
      {
        name: 'Mon.', items: [
          { title: 'DECO0000(TUT)', begin: '10:00AM', end: '12:00AM' },
          { "title": "DECO0000 002", "introduction": "xxxx xxxx xxxx xxxx", "begin": "11:00(Syndey Time) 9 April,2022", "end": "23:59:00(Syndey Time) 10 April,2022" }]
      },
      {
        name: 'Tue.', items: [
          { "title": "DECO0000101 2", "introduction": "xxxx xxxx xxxx xxxx", "begin": "12:00(Syndey Time) 9 April,2022", "end": "23:59:00(Syndey Time) 10 April,2022" },
          { "title": "DECO0000201 2", "introduction": "xxxx xxxx xxxx xxxx", "begin": "12:00(Syndey Time) 9 April,2022", "end": "23:59:00(Syndey Time) 10 April,2022" }
        ]
      },
      { name: 'Wed.', items: [{ title: 'DECO0000(TUT)', begin: '10:00AM', end: '12:00AM' }] },
      { name: 'Thu.', items: [{ "title": "DECO0000201-2", "introduction": "xxxx xxxx xxxx xxxx", "begin": "12:00(Syndey Time) 9 April,2022", "end": "23:59:00(Syndey Time) 10 April,2022" }] },
      {
        name: 'Fri.', items: [
          { title: 'DECO0000(TUT)', begin: '10:00AM', end: '12:00AM' },
          { title: 'DECO0000(TUT)', begin: '10:00AM', end: '12:00AM' },
          { "title": "DECO0000201-5", "introduction": "xxxx xxxx xxxx xxxx", "begin": "15:00(Syndey Time) 9 April,2022", "end": "23:59:00(Syndey Time) 10 April,2022" }
        ]
      },
    ];

    this.saveData();

  }

  saveData () {
    this.kv.setKanban(this.list)
  }

  handleDelete (e, data, pIndex, index) {
    const row = JSON.parse(decodeURIComponent(data))
    console.log('delete', e, row, pIndex, index);
    if (!window.confirm('are you sure delete')) {
      return;
    }
    this.list[pIndex].items.splice(index, 1);
    this.saveData();

    this.initData();
  }


  initData () {
    this.renderHtml();
    this.addEvent();
  }

  renderHtml () {
    const element = getElement('kanban-borad');

    let html = ``;
    this.list.forEach((row, index) => {

      let rowHtml = ``
      row.items.forEach((obj, o) => {
        rowHtml += `
          <div class=" mb-10 fs-sm">
            <div class="card p-2 position-relative bg-color-${obj.status || 1} text-white">
              <div class="fs-md">${obj.title}</div>
              <div class="">${obj.begin}~${obj.end}</div>
              <div class="mt-8" style=" white-space: pre-wrap;">${obj.introduction || ''}</div>
              <div class="position-absolute top-0 end-0" onclick="__KanbanBorad__.handleDelete(event, '${encodeURIComponent(JSON.stringify(obj))}',${index}, ${o})">
                <svg t="1653137683944" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2993" width="16" height="16"><path d="M854.357322 285.951661l-34.659381 663.552671-0.030699 0.378623c-2.548032 28.499078-26.759457 50.837852-55.115272 50.837852l-474.844775 0c-28.355815 0-52.577472-22.338774-55.125505-50.837852l-0.051165-0.757247-34.618449-663.174048c-0.583285-11.2973 8.084119-20.916379 19.371186-21.509896 11.2973-0.593518 20.916379 8.084119 21.509896 19.371186l34.58775 662.703327c0.798179 7.101745 7.41897 13.272281 14.326287 13.272281l474.844775 0c6.897084 0 13.517875-6.170536 14.316054-13.262048l34.608216-662.71356c0.593518-11.287067 10.212596-19.954471 21.509896-19.371186C846.273203 265.035282 854.940606 274.664593 854.357322 285.951661z" p-id="2994"></path><path d="M936.191118 141.716652c0 11.307533-9.15859 20.466124-20.466124 20.466124l-265.875416 0c-11.307533 0-20.466124-9.15859-20.466124-20.466124l0-61.35744c0-11.266601-9.168824-20.435425-20.435425-20.435425l-163.616428 0c-11.276834 0-20.445658 9.168824-20.445658 20.435425l0 61.35744c0 11.307533-9.15859 20.466124-20.466124 20.466124l-265.875416 0c-11.2973 0-20.466124-9.15859-20.466124-20.466124 0-11.307533 9.168824-20.466124 20.466124-20.466124l245.409292 0 0-40.891316c0-33.840736 27.53717-61.367673 61.377906-61.367673l163.616428 0c33.830503 0 61.367673 27.526937 61.367673 61.367673l0 40.891316 245.409292 0C927.032528 121.250528 936.191118 130.409119 936.191118 141.716652z" p-id="2995"></path><path d="M639.636982 305.33308l0 572.662615c0 11.2973-9.168824 20.466124-20.466124 20.466124-11.307533 0-20.466124-9.168824-20.466124-20.466124l0-572.662615c0-11.307533 9.15859-20.466124 20.466124-20.466124C630.468159 284.866956 639.636982 294.025547 639.636982 305.33308z" p-id="2996"></path><path d="M455.564663 305.33308l0 572.662615c0 11.2973-9.15859 20.466124-20.466124 20.466124-11.2973 0-20.466124-9.168824-20.466124-20.466124l0-572.662615c0-11.307533 9.168824-20.466124 20.466124-20.466124C446.406073 284.866956 455.564663 294.025547 455.564663 305.33308z" p-id="2997"></path></svg>
              </div>
            </div>
          </div>
        `
      })
      html += `
      <div class="col-md-2 mt-4 mt-md-2" >
        <div class=" text-center mb-20 h3">
          ${row.name}
        </div>
        ${rowHtml}
      </div>
      `;

      if (this.list.length - 1 != index) {
        html += `
        <div class="col-auto d-none d-md-block">
          <div class="vr" style="height: 100%;"></div>
        </div>
        `
      }
    })

    element.innerHTML = html;
  }

  handleShowDialog (isShow) {
    let dialog = getElement('kanban-dialog')
    if (isShow) {
      dialog.classList.remove('hide-element');
    } else {
      dialog.classList.add('hide-element');
    }
  }
  addEvent () {
    let element = getElement('add-plan');

    let btnSave = getElement('btnSave')
    let btnClose = getElement('btnClose')

    element.addEventListener('click', () => {
      this.handleShowDialog(true);
    })
    btnClose.addEventListener('click', () => {
      this.handleShowDialog(false);
    })

    btnSave.addEventListener('click', () => {
      // 
      const data = {

      }
      'name,title,begin,end,introduction'.split(',').forEach((id) => {
        data[id] = getElement(id).value;
      })
      if (!data.name) {
        alert('please choose week')
        return;
      }
      if (!data.title) {
        alert('please enter name')
        return;
      }
      if (!data.begin) {
        alert('please choose begin time')
        return;
      }
      if (!data.end) {
        alert('please choose end time')
        return;
      }

      console.log(data);

      const obj = this.list.find((p) => p.name == data.name)
      obj.items.push(data);
      console.log(obj);

      this.handleShowDialog(false);
      this.saveData();
      this.renderHtml()

    })

  }
}

window.__KanbanBorad__ = new KanbanBorad();
window.__ClassAssessment__ = new ClassAssessment();
window.__Header__ = new Header();

window.onload = function () {
  window.__Header__.init();
}