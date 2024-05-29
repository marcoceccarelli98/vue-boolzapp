"use strict";

const { createApp } = Vue;

const dt = luxon.DateTime;

createApp({
  data() {
    return {
      contacts: [
        {
          name: "Michele",
          avatar: "./img/avatar_1.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              // message: "Tutto fatto!",
              message:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsam temporibus voluptas exercitationem reprehenderit commodi vero beatae, nulla voluptatibus aliquam dolor consectetur perferendis iure vel aspernatur, corrupti voluptatem recusandae eaque!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "./img/avatar_2.jpg",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "./img/avatar_3.jpg",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "./img/avatar_4.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "./img/avatar_5.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "./img/avatar_6.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "./img/avatar_7.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "./img/avatar_8.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
      indexChat: 0,
      newMessage: "",
      contactsFilter: "",
      viewOptions: false,
      optionsIndex: null,
      viewOnlyUsers: true,
    };
  },

  methods: {
    // CHANGE INDEX CHAT
    changeChat(index) {
      console.log(index);
      this.indexChat = index;
      this.viewOnlyUsers = false;
    },

    // SEND MESSAGE
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.contacts[this.indexChat].messages.push({
          date: "09/10/1998 12:00:00",
          message: this.newMessage,
          status: "sent",
        });
        this.newMessage = "";
        //Aswer ok after 1 second i sent any message
        setTimeout(() => {
          this.contacts[this.indexChat].messages.push({
            date: "09/10/1998 12:00:00",
            message: "ok",
            status: "received",
          });
        }, 1000);
      }
    },

    // FILTER CONTACTS
    filterContacts() {
      this.contacts.forEach((contact) => {
        //If the text in input search is contained in name set visible true
        if (
          contact.name.toLowerCase().includes(this.contactsFilter.toLowerCase())
        ) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      });
    },

    // TOGGLE OPTIONS
    toggleOptions(index) {
      if (this.optionsIndex === index) {
        // Close if already open
        this.optionsIndex = null;
        this.viewOptions = false;
      } else {
        this.optionsIndex = index;
        this.viewOptions = true;
      }
    },

    //BACK TO CONTACTS
    backToContacts() {
      this.viewOnlyUsers = true;
    },

    // DELETE MESSAGE
    deleteMsg(index) {
      this.contacts[this.indexChat].messages.splice(index, 1);
      this.viewOptions = false;
      this.optionsIndex = null;
    },

    // SHOW ONLY HOUR AND MIN OF LAST MESSAGE
    showLastMsgTime(index) {
      //String that contains the last message date and time
      const lastMsgDt =
        this.contacts[index].messages[this.contacts[index].messages.length - 1]
          .date;
      //Conversion of string to date format
      const dateTime = dt.fromFormat(lastMsgDt, "dd/MM/yyyy HH:mm:ss");
      const str = dateTime.toFormat("HH:mm");
      return str;
    },

    // TRUNCATE STRING
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + "...";
    },
  },
}).mount("#app");
