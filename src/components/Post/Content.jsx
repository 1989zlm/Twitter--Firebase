const Content = ({ tweet }) => {
  return (
    <div>
      {tweet.textContent && <p>{tweet.textContent}</p>}
      {tweet.imageContent && (
        <img
          className="max-h-[400px] object-cover rounded-lg my-2"
          src={tweet.imageContent}
        />
      )}
    </div>

    //! bunu ındex.jsx orta kısımdan kopyalayıp getirdik buraya uyarladık
    // <div>
    //   {tweet.textContent && !isEditMode && <p>{tweet.textContent}</p>}
    //   {tweet.imageContent && !isEditMode && (
    //     <img
    //       className="max-h-[400px] object-cover w-full rounded-lg my-2"
    //       src={tweet.imageContent}
    //     />
    //   )}
    // </div>
  );
};

export default Content;
