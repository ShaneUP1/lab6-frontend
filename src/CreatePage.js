import React, { Component } from 'react'
import { fetchMtnRanges, createFourteener } from './utils.js'

const userFromWherever = {
    userId: 1
};

export default class CreatePage extends Component {

    state = {
        mtn_ranges: []
    }

    componentDidMount = async () => {
        const mtn_ranges = await fetchMtnRanges();
        this.setState({ mtn_ranges });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const newFourteener = {
            name: this.state.name,
            elevation: this.state.elevation,
            mtn_range_id: this.state.rangeId,
            drive_to_top: this.state.drive_to_top,
            owner_id: userFromWherever.userId
        }

        await createFourteener(newFourteener);

        this.props.history.push('/');
    }

    handleChange = (e) => {
        this.setState({
            rangeId: e.target.value,
            drive_to_top: e.target.value
        })
    }



    render() {

        return (
            <div className='create-main'>
                <h2>Enter a new fourteener</h2>

                <form onSubmit={this.handleSubmit} className='form'>

                    <label className='name'>
                        Fourteener Name
                        <input onChange={e => this.setState({ name: e.target.value })} />
                    </label>

                    <label className='elevation'>
                        Elevation
                        <input onChange={e => this.setState({ elevation: e.target.value })} type='number' />
                    </label>

                    <label className='range'>
                        Mountain Range
                        <select onChange={this.handleChange} >
                            <option></option>
                            {
                                this.state.mtn_ranges.map(range => <option key={range.id} value={range.id}>
                                    {range.name}
                                </option>)
                            }
                        </select>
                    </label>

                    <label className="to-top">
                        Can Drive to the Top?
                        <select onChange={e => this.setState({ drive_to_top: e.target.value })}>
                            <option value=''></option>
                            <option value='true'>Yes</option>
                            <option value='false'>Nope</option>
                        </select>
                    </label>

                    <button>Submit</button>

                </form>

            </div>
        )
    }
}
