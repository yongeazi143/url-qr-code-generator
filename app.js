class Qrcode {
  constructor(url, size) {
    this.url = url;
    this.size = size;
  }

  generateQRCode() {
    new QRCode("qrcode", {
      text: this.url,
      width: this.size,
      height: this.size,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
}

class NodeElement {
  constructor(form, inputUrl, size = 300) {
    this.form = form;
    this.inputUrl = inputUrl;
    this.size = size;
    this.qr = document.querySelector("#qrcode");
  }

  eventHandler() {
    this.form.addEventListener("submit", this.generateQRCodeHandler.bind(this));
  }

  generateQRCodeHandler(e) {
    e.preventDefault();
    this.clearUI();
    if (this.inputUrl.value === "") {
      this.shakeAnimation();
      console.log(this.inputUrl.value);
    } else {
      let url = this.inputUrl.value;
      let size = this.size.value;
      this.showSpinner();
      setTimeout(() => {
        this.hideSpinner();

        const qrcode = new Qrcode(url, size);
        qrcode.generateQRCode();
        setTimeout(() => {
          const saveUrl = this.qr.querySelector("img").src;
          this.saveQRCodeBtn(saveUrl);
        }, 50);
      }, 1000);
    }
  }

  clearUI() {
    this.qr.innerHTML = "";
    const saveLink = document.querySelector("#save-qr-code");
    if (saveLink) saveLink.remove();
  }
  saveQRCodeBtn(saveUrl) {
    const saveBTn = document.createElement("a");
    saveBTn.id = "save-qr-code";
    saveBTn.classList =
      "w-full text-slate-100 m-auto bg-[#3e52a3] rounded text-center hover:bg-blue-700 font-bold py-2 px-2 mt-3 md:w-1/3";
    saveBTn.href = saveUrl;
    saveBTn.download = "qrcode";
    saveBTn.innerHTML = "Save Image";
    document.querySelector("#qr-code-container").appendChild(saveBTn);
  }

  // For Invalid Or Empty URL
  shakeAnimation() {
    this.inputUrl.focus();
    this.inputUrl.classList.add("shake");
    setTimeout(() => {
      this.inputUrl.classList.remove("shake");
    }, 500);
  }
  // Spinner
  showSpinner() {
    document.getElementById("loader").style.display = "block";
  }
  hideSpinner() {
    document.getElementById("loader").style.display = "none";
  }
}

const node = new NodeElement(
  document.querySelector("#generateQR"),
  document.querySelector("#url"),
  document.querySelector("#size")
);

node.eventHandler();
