
window.onload = function() {
    const formData = JSON.parse(localStorage.getItem("formData"));
    const container = document.querySelector(".container");

    console.log(formData)

    Object.keys(formData).forEach((item, index) => {
        const value = formData[item];
        const label = item;
        const labelElement = document.createElement("p");
        labelElement.innerText = label;
        const element = document.createElement("div");
        element.innerText = value;

        const row = document.createElement("div");
        row.classList.add("row");
        labelElement.classList.add("displayValues")
        
        row.appendChild(labelElement);
        row.appendChild(element);

        container.appendChild(row);
    });

}