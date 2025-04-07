const content = document.getElementById('content')
const btns = document.getElementById("btns")
const data = []
let say = 25
let count = say

fetch('../data/db.json')
    .then(res => res.json())
    .then(info => {
        data.push(...info);
        show();
        handlePagination();
        initVanillaTilt();
    })

function show() {
    content.innerHTML = ''
    data
        .slice(count - say, count)
        .map(item => {
            content.innerHTML += `
                    <article class="flex flex-col relative rgb" data-tilt>
                        <div class="bg-[white] h-[360px] overflow-hidden rounded-[8px] flex flex-col z-[9999]">
                            <a rel="noopener noreferrer" href="" aria-label="Te nulla oportere reprimique his dolorum">
                                <img alt="" class="object-cover w-full h-52 dark:bg-gray-500"
                                    src="${item.flags.png}">
                            </a>
                            <div class="flex flex-col border-t-[1px] border-[grey] overflow-y-auto flex-1 p-6">
                                <a rel="noopener noreferrer" href="#"
                                    aria-label="Te nulla oportere reprimique his dolorum"></a>
                                <a rel="noopener noreferrer" href="#"
                                    class="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"></a>
                                <h3 class="flex-1 pt-2 text-lg font-semibold leading-snug">${item.name.common}</h3>
                                <h3 class="flex-1 text-l leading-snug">${item.name.official}</h3>
                                <div class="flex flex-wrap justify-between pt-3 space-x-2 text-xs dark:text-gray-600">
                                    <span>${item.altSpellings}</span>
                                </div>
                            </div>
                        </div>
                    </article>`
        })
}

function handlePagination() {
    Array(Math.ceil(data.length / count))
        .fill("")
        .map((_, i) => btns.innerHTML += ` <button onclick="artir( ${i + 1} )" class="cursor-pointer p-[10px] py-[8px] border border-black rounded-[8px]">${i + 1}</button>`)
}

function artir(x) {
    count = x * say
    show()
    initVanillaTilt();
    scrollTo({
        top: document.getElementById("topElem").offsetTop,
        behavior: "smooth"
    })
}

function initVanillaTilt() {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.05,
        perspective: 1000,
    });
}