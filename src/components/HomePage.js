import React from 'react';

const HomePage = () => (
    <div className="container-login100">
        <div className="wrap-login100">
            <form className="login100-form validate-form">
                <span className="login100-form-title p-b-26">
						Sinhala Grammar Tool
                </span>

                <div>
                    <div className="textarea-container">
                        <textarea
                            placeholder="Insert the sentences here...">ඇය මට ගිය සතියේ ලියුමක් එව්වේය. මා ඇය හට එය සඳහා පිළිතුරක් කෑවේය.</textarea>
                        <div className="backdrop">
                            <div className="highlights" />
                        </div>
                    </div>
                    <button>Check Grammar</button>
                </div>
            </form>
        </div>
    </div>
)


export default HomePage;
