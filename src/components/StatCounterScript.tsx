const SC_PROJECT = 13078997;
const SC_INVISIBLE = 1;
const SC_SECURITY = "23bc720b";

export default function StatCounterScript() {
    const scriptContent = `
    var sc_project=${SC_PROJECT};
    var sc_invisible=${SC_INVISIBLE};
    var sc_security='${SC_SECURITY}';
  `;

    return (
        <>
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{ __html: scriptContent }}
            />
            <script
                type="text/javascript"
                src="https://www.statcounter.com/counter/counter.js"
                async
            />
        </>
    );
}