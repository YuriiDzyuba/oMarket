const welcomePage = (pageContent, context) => `
    <div style="background: palegreen">
        <h1>${pageContent.p1}</h1>
        <br>
        <p>click here:<a href="${context.activationLink}">${context.activationLink}</a></p>
        <br>
        <h2>${pageContent.p2}</h2>
    </div>
    `;
module.exports = welcomePage;
