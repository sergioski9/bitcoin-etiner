import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dynamic"
export default class extends Controller {
  static targets = ["input", "info", "hash", "dest","hidden"]

  connect() {
  }

  data(e) {
    e.preventDefault()
    const hash = this.inputTargets[0].value
    const csrfToken = document.querySelector("[name='csrf-token']").content

    fetch(`https://blockchain.info/rawblock/${hash}`)
    .then(response => response.json())
    .then(data => {
      this.postData(data, csrfToken)
      const html = `
        <div data-dynamic-target="dest" class="nohidden" >
          <div>
            <h4 data-dynamic-target="hash">${data.hash}</h4>
            <button data-action="click->dynamic#toggle">ver</button>
            <button data-action="click->dynamic#destroy">
              delete
            </button>
          </div>
          <div class="hidden">
            <h3>hash: ${data.hash}</h3>
            <h3>prev block: ${data.prev_block}</h3>
            <h3>block_index: ${data.block_index}</h3>
            <h3>time : ${data.time}</h3>
            <h3>bits : ${data.bits}</h3>
          </div>
        </div>
      `
      this.infoTargets[0].insertAdjacentHTML("beforeend", html)
    })
  }

  toggle() {
  }

  destroy() {
    fetch(`/cryptos/${this.hashTargets[0].innerText}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => console.log(res))

  }

  postData(data, csrfToken) {
    fetch("/cryptos", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({
        hash: data.hash,
        prev_block: data.prev_block,
        block_index: data.block_index,
        time: data.time,
        bits: data.bits
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }
}
