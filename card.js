// Configuration
const config = {
  url: "https://randomuser.me/api/",
  numberCards: 24
};
let titleOfCard,imageOfCard,callButton,card;

  class cardsShow extends HTMLElement {
    constructor() {
      super();
        // Call API to get cards
        fetch(`${config.url}/?results=${config.numberCards}`)
          .then(function (response) {
            return response.json();
          })
          .then(function (apiResponse) {
            const apiResponseResults=apiResponse.results; //Getting the result from api where the required data is present.
            apiResponseResults.filter(gender=>gender.gender=="male")// Using filter operator to filter out only male gender.
            .map((data)=>{
                titleOfCard =document.createElement("p"); // Creating p tag for displaying name.
                titleOfCard.classList.add("card__title"); // Adding class card__title in p tag.
                titleOfCard.innerHTML=data.name.first+ " " +data.name.last; // Getting first name and last name and concatinating it.
                imageOfCard=document.createElement("img");// Creating img for displaying image.
                imageOfCard.classList.add("card__image");// Adding class card__image in img.
                imageOfCard.setAttribute("src", data.picture.large); // displaying image from the response.
                callButton=document.createElement("button");// Creating button to show call
                callButton.appendChild(document.createTextNode("Call"));// Adding text on the button.
                callButton.classList.add("card__cta");// Adding class card__cta on it.
                card = document.createElement("card");// creating card
                card.appendChild(imageOfCard);// Appending image
                card.appendChild(titleOfCard);// Appending title of the card
                card.appendChild(callButton); // appending call button
                document.getElementsByTagName('card-wrapper')[0].appendChild(card); // Getting card-wrapper and appending card on it.  
           })
          });
        
    }
  }


// Define CardWrapper Component
window.customElements.define("card-wrapper",cardsShow);
