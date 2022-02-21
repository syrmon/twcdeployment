// @ts-nocheck
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import styles from "./chat.module.css";
import linear from "./assets/team-shape.svg";
import emoji from "./assets/emoji.svg";
import SpeedDialsHooks from './../speed-dial/SpeedDialsHooks';


const ChatApp = ({ clickViewController }) => {
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [textClass, setTextClass] = React.useState("");
  const [firstMessageEmail,setFirstMessageEmail] = React.useState(false)
  const [showEmojiBox, setShowEmojiBox] = React.useState(false);

  const isDisabled = message.length > 0 ? true : false;

  const formValidationController = (e) => {
    if (!isDisabled) {
      setError("Mesaj mətni vacibdir!");
      setTextClass("text-area-placeholder-changer");
      setTimeout(() => {
        setError("");
        setTextClass("");
      }, 2500);
    e.preventDefault();
  } else {
      setFirstMessageEmail(true) ; 
  }
}

  const addEmoji = (emoji) => {
    const updatedMessage = message.concat(emoji.native);
    setMessage(updatedMessage);
  };

  return (
    <div className='main animate__animated animate__backInRight'>
     
      <div className='chat-header'>
        <div className='profile-container'>
          <div className='profile'></div>
          <h2>TWC</h2>
        </div>
          <MdOutlineKeyboardArrowDown
          onClick={clickViewController}
          className='icon-font-size-lg pointer'
        />
      </div>
      <div className='betweener'>
        <p>Bir neçə dəqiqə ərzində sizə geri dönüş olunacaq</p>
      </div>

      <div className='conversation-group'>
        <img src={linear} alt='' />
        <p className='message-operator animate__animated animate__fadeIn animate__delay-2s'>
          Salam, mən TWC-nin onlayn dəstəyiyəm. Sizə necə kömək edə bilərəm?
        </p>
        <div
          className={`${showEmojiBox === true ? `${styles.emoji_box}` : "display_none"} d-flex justify-center`}
        >
          <Picker
            onClick={(emoji, event) => addEmoji(emoji)}
            set='apple'
            showPreview={false}
            showSkinTones={false}
            i18n={{ search: 'Recherche', categories: { search: 'Résultats de recherche', recent: 'Récents' } }} />
          />
        </div>
      </div>
      <div className='input-group'>
        <hr />
         <SpeedDialsHooks  />
        <form onSubmit={formValidationController}>
         <button className='send-button'>
          <BiSend />
        </button>
          <textarea
            name='message'
            id='message'
            value={message}
            className={`${textClass}`}
            placeholder={error.length > 0 ? error : "Mesajınızı daxil edin..."}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <img
            className='pointer'
            src={emoji}
            alt=''
            onClick={() => setShowEmojiBox(!showEmojiBox)}
          />

        </form>
      </div>
    </div>
  )
}

export default ChatApp