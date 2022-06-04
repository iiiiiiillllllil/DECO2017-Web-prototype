
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
              <svg t="1653069694602" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2803"  width="25" height="25"><path d="M512 85.333333c282.752 0 426.666667 143.914667 426.666667 426.666667s-143.914667 426.666667-426.666667 426.666667S85.333333 794.752 85.333333 512 229.248 85.333333 512 85.333333z m211.2 293.504a42.666667 42.666667 0 0 0-60.330667 0l-211.2 211.2-90.538666-90.538666a42.666667 42.666667 0 0 0-60.330667 60.330666L421.546667 680.533333a42.666667 42.666667 0 0 0 60.330666 0l241.365334-241.365333a42.666667 42.666667 0 0 0 0-60.330667z" fill="#000000" p-id="2804"></path></svg>
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


window.__ClassAssessment__ = new ClassAssessment();