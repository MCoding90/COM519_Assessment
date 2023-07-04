const phonesView = (phones) => `
<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${phones.Brand}</h5>
        <div class="card-body">
          <ul class="list-group">
               <li class="list-group-item">Model: ${phones.Model}</li>
                <li class="list-group-item">Origin: ${phones.Origin}</li>
                <li class="list-group-item">Released: ${phones.Released}</li>
                <li class="list-group-item">Processor: ${phones.Processor}</li>
                <li class="list-group-item">Display: ${phones.Display}</li>
                <li class="list-group-item">Memory: ${phones.Memory}</li>
                <li class="list-group-item">Battery: ${phones.Battery}</li>
          </ul>
        </div>
      </div>
 </div>
`;

const handleClick = async () => {
	const searchPhonesVal = document.querySelector("#searchInput").value;
	const phonesDomRef = document.querySelector("#phonesItems");

	try {
		const ref = await fetch(`/api/searched-phones/?search=${searchPhonesVal}`);
		const searchResults = await ref.json();
		let phonesHtml = [];
		searchResults.forEach((phones) => {
			phonesHtml.push(phonesView(phones));
		});
		phonesDomRef.innerHTML = phonesHtml.join("");
	} catch (e) {
		console.log(e);
		console.log("could not search api");
	}
};
