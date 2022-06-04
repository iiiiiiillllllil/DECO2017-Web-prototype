
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