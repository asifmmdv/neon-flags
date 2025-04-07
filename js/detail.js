const urlParams = new URLSearchParams(window.location.search);
const itemCode = urlParams.get('code');
const content2 = document.getElementById('content2');

fetch('../data/db.json')
  .then(response => response.json())
  .then(data => {
    const item = data.find(i => i.cca3 === itemCode || i.id === itemCode);
    content2.innerHTML = `
      <article class="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-50">
        <img src="${item.flags?.png || item.imageUrl || 'https://source.unsplash.com/random/480x360'}" 
             alt="${item.name?.common || item.title || 'Content image'}" 
             class="object-cover w-full h-64 rounded sm:h-96 border-[1px] mt-[50px] lg:col-span-7 dark:bg-gray-500">
        
        <div class="p-6 space-y-4 lg:col-span-5">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-2xl font-semibold sm:text-4xl">${item.name?.common || item.title || 'Untitled'}</h3>
              ${item.name?.official ? `<h4 class="text-xl text-gray-600">${item.name.official}</h4>` : ''}
            </div>
            <button onclick="window.history.back()" class="px-3 py-1 bg-gray-200 rounded-lg">← Back</button>
          </div>
          
          ${item.capital ? `
            <div class="bg-white p-3 rounded-lg shadow">
              <h4 class="font-bold text-gray-500">Capital</h4>
              <p>${Array.isArray(item.capital) ? item.capital.join(', ') : item.capital}</p>
            </div>
          ` : ''}
          
          ${item.population ? `
            <div class="bg-white p-3 rounded-lg shadow">
              <h4 class="font-bold text-gray-500">Population</h4>
              <p>${item.population.toLocaleString()}</p>
            </div>
          ` : ''}
          
          ${item.languages ? `
            <div class="bg-white p-3 rounded-lg shadow">
              <h4 class="font-bold text-gray-500">Languages</h4>
              <div class="flex flex-wrap gap-2">
                ${Object.values(item.languages).map(lang => `
                  <span class="px-2 py-1 bg-blue-100 rounded-full text-sm">${lang}</span>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          ${item.borders?.length > 0 ? `
            <div class="bg-white p-3 rounded-lg shadow">
              <h4 class="font-bold text-gray-500">Border Countries</h4>
              <div class="flex flex-wrap gap-2">
                ${item.borders.map(border => `
                  <a href="detail.html?code=${border}" class="px-2 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">
                    ${data.find(c => c.cca3 === border)?.name.common || border}
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </article>
    `;
  });