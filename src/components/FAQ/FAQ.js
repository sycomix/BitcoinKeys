import React, { Component } from 'react';
import { Grid, Row, Table } from 'react-bootstrap';

class FAQComponent extends Component {
    render() {
        return (
            <div className="backgroundColorBody stylingForFAQ">
                <Grid>
                    <Row className="show-grid">
                        <div style={{ paddingTop: 20 }}>
                            <p><b className="styleQ">Q:</b> Is this real?</p>
                            <p><b className="styleQ">A:</b> Yes.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Is this fake?</p>
                            <p><b className="styleQ">A:</b> No.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Are my bitcoins safe?</p>
                            <p><b className="styleQ">A:</b> Yes.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Is this a joke?</p>
                            <p><b className="styleQ">A:</b> Sort of.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Is this a prank?</p>
                            <p><b className="styleQ">A:</b> No.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> What's the difference between a prank and a joke?</p>
                            <p><b className="styleQ">A:</b> joke:  a thing that someone says to cause amusement or laughter, especially a story with a funny punchline.
   prank: a practical joke or mischievous act.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Can I search by private key?</p>
                            <p><b className="styleQ">A:</b> Yes. @see API documentation.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Should I search by private key?</p>
                            <p><b className="styleQ">A:</b> No. I log and steal everything.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Is there a RESTful API?</p>
                            <p><b className="styleQ">A:</b> Yes.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Method</th>
                                        <th>Resource</th>
                                        <th>Description</th>
                                        <th>Media Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>GET</td>
                                        <td>/:page_no</td>
                                        <td>Fetches a page </td>
                                        <td>text/html</td>
                                    </tr>
                                    <tr>
                                        <td>GET</td>
                                        <td>/warning:understand-how-this-works!/:private_key</td>
                                        <td>Finds a page by private key</td>
                                        <td>text/html</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> How does this work?</p>
                            <p><b className="styleQ">A:</b> Private keys are a number. </p>
                            <p className="paddingForFAQ"> Private keys can be very large numbers.</p>
                            <p className="paddingForFAQ"> Private keys can be very small numbers.</p>
                            <div style={{ paddingTop: 10 }}>
                                <p className="paddingForFAQ mobileDisplay"> A private key with the value   0 would generate the address: 16QaFeudRUt8NYy2yzjm3BMvG4xBbAsBFM</p>
                                <p className="paddingForFAQ mobileDisplay"> A private key with the value   1 would generate the address: 1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm</p>
                                <p className="paddingForFAQ mobileDisplay"> A private key with the value   2 would generate the address: 1LagHJk2FyCV2VzrNHVqg3gYG4TSYwDV4m</p>
                                <p className="paddingForFAQ mobileDisplay"> A private key with the value 127 would generate the address: 1FB8cZijTpRQp3HX8AEkNuQJBqApqfTcX7</p>
                            </div>
                            <div style={{ paddingTop: 10 }}>
                                <p className="paddingForFAQ"> For every page requested, 128 keys are generated.</p>
                                <p className="paddingForFAQ"> For page 1, private keys with the value   0 to 127 are generated.</p>
                                <p className="paddingForFAQ"> For page 2, private keys with the value 128 to 255 are generated.</p>
                                <p className="paddingForFAQ"> For page 3, private keys with the value 256 to 383 are generated.</p>
                            </div>
                            <div style={{ paddingTop: 10 }}>
                                <p className="paddingForFAQ"> For page P, private keys with the value (P-1) * 128 to (P-1) * 128 + 127 are generated.</p>
                            </div>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> So you don't store a database of every single key?</p>
                            <p><b className="styleQ">A:</b> No.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> All keys are generated on the fly, based upon the page number?</p>
                            <p><b className="styleQ">A:</b> Yes.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> That means, somewhere, on some page, my private key is listed?</p>
                            <p><b className="styleQ">A:</b> Yes. But it will never be found. Ever. Because math. (@see http://redd.it/1rurll)</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Why did you originally post this as "All bitcoin private keys leaked!"?</p>
                            <p><b className="styleQ">A:</b> #bitcoin-dev December 01 2013</p>
                            <p className="paddingForFAQ">| 14:03	saracen	: In a similar vein to this http://pastebin.com/2qbRKh3R, I leaked all the bitcoin private keys: http://directory.io - Now I just have to hope "reseachers" don't attempt to download every page.</p>
                            <p className="paddingForFAQ">| 14:07	sipa	: haha!</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> I heard this cost billions in a panic sell off. Is that correct?</p>
                            <p><b className="styleQ">A:</b> No.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> But it made the price fall, right?</p>
                            <p><b className="styleQ">A:</b> No.</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> What made the price fall?!</p>
                            <p><b className="styleQ">A:</b> *shrug*</p>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <p><b className="styleQ">Q:</b> Are donations really welcome?</p>
                            <p><b className="styleQ">A:</b> No.</p>
                        </div>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default FAQComponent;