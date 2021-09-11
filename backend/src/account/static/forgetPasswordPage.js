const forgetPasswordPage = (pageContent, context) => `
   <div style="background: palegreen">
        <h1>${context.header ? context.header : null}</h1>
        <br>
        <p>click here:<a href="${context.activationLink}">${context.activationLink}</a></p>
        <br>
        <h2>${pageContent.p1}</h2>
    </div>
    `;
module.exports = forgetPasswordPage;
