import React from 'react';
import styled from 'styled-components';

const Title = styled.span`
    display: block;
    font-family: Poppins-Bold;
    font-size: 30px;
    color: #333333;
    line-height: 1.2;
    text-align: center;
`;

const HomePage = () => (
    <div className="container-login100">
        <div className="wrap-login100">
            <form className="login100-form validate-form">
                {/* <span className="login100-form-title p-b-26">
						Sinhala Grammar Tool
                </span> */}
                <Title className="p-b-26">Sinhala Grammar Tool</Title>

                <div>
                    <div className="textarea-container">
                        <textarea placeholder="Insert the sentences here...">
                            ඇය මට ගිය සතියේ ලියුමක් එව්වේය. මා ඇය හට එය සඳහා
                            පිළිතුරක් කෑවේය.
                        </textarea>
                        <div className="backdrop">
                            <div className="highlights" />
                        </div>
                    </div>
                    <button>Check Grammar</button>
                </div>
            </form>
        </div>
    </div>
);

export default HomePage;
