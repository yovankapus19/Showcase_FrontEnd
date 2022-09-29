let password = "inipass";
    let x = prompt("Enter in the password ",);
    if (x.toLowerCase() == password) {
     alert("Come right in \n \n You've entered in the right password, click OK to to continue")
    }
    else {
        alert("Wrong Password..")
     window.location = "index.html";
    }
const formList = document.querySelector("#form-list");
const tulisList = document.querySelector("#tulis-list");
const listKegiatan = document.querySelector("#list-kegiatan");
const cariList = document.querySelector("#cari-list");
const hapusSemuaList = document.querySelector("#hapus-semua-list");



formList.addEventListener("submit", createList);
listKegiatan.addEventListener("click", ubahList);
cariList.addEventListener("keyup", pencarianList);
hapusSemuaList.addEventListener("click", hapusListItem);

function createList(e) {
    e.preventDefault();


    if (tulisList.value) {
        // Membuat element LI
        const li = document.createElement("li");
        li.className = "list-group-item item-list";
        li.appendChild(document.createTextNode(tulisList.value));

        // Membuat button delete
        const deleteList = document.createElement("a");
        deleteList.className = "d-flex justify-content-end text-decoration-none mb-2";
        deleteList.style = "margin-top:-20px;";
        deleteList.href = "#";

        const spanDelete = document.createElement("span");
        spanDelete.className = "badge bg-danger delete-list";
        spanDelete.innerHTML = "Delete";

        deleteList.appendChild(spanDelete);

        // Membuat button selesai
        const selesaiList = document.createElement("a");
        selesaiList.className = "d-flex justify-content-end text-decoration-none";
        selesaiList.href = "#";

        const spanSelesai = document.createElement("span");
        spanSelesai.className = "badge bg-primary selesai-list";
        spanSelesai.innerHTML = "Selesai";

        selesaiList.appendChild(spanSelesai);

        // Menggabungkan semua element
        li.appendChild(deleteList);
        li.appendChild(selesaiList);

        listKegiatan.appendChild(li);

        tambahDataKeLocalStorage(tulisList.value);
        tulisList.value = "";
    } else {
        alert("Kamu belum menulis apa-apa, silahkan tulis terlebih dahulu");
    }


}

function tambahDataKeLocalStorage(isiList) {
    let list;
    (localStorage.getItem("list") == null) ? list = [] :list = JSON.parse(localStorage.getItem("list"));

    list.push({
        status: 0,
        isi: isiList
    });

    localStorage.setItem("list", JSON.stringify(list));

}

function ubahList(e) {
    e.preventDefault();

    if (e.target.classList.contains("delete-list")) {

        if (confirm("Apakah anda yakin mau menghapus list ini?")) {
            const element = e.target.parentElement;
            const elementList = element.parentElement;
            elementList.remove();
        }

    } else if (e.target.classList.contains("selesai-list")) {

        if (confirm("Apakah anda yakin list ini sudah selesai?")) {
            const element = e.target.parentElement;
            const elementList = element.parentElement;
            elementList.className = "list-group-item item-list selesai";
            // elementList.style = "background-color: #808080";
            element.remove();
            ubahListLocalStorage(elementList);
        }

    }

}

function ubahListLocalStorage(elementList) {
    const list = getList();

    list.forEach((konten, index) => {
        if (elementList.firstChild.textContent === konten.isi){
            list.splice(index, 1,{
                status: "1",
                isi : elementList.firstChild.textContent
            })
        }
    })
    localStorage.setItem("list", JSON.stringify(list));
    
}


function pencarianList(e) {
    const cariList = e.target.value.toLowerCase();
    let itemList = document.querySelectorAll(".item-list");

    itemList.forEach((item) => {
        const isiItem = item.firstChild.textContent.toLowerCase();

        if (isiItem.indexOf(cariList) != -1) {
            item.setAttribute("style", "display: block;");
        } else {
            item.setAttribute("style", "display: none !important;");
        }

    });


}

function hapusListItem() {
    
    if (confirm("Anda yakin mau menghapus semua list?")) {
        listKegiatan.innerHTML = "";
    }
}
