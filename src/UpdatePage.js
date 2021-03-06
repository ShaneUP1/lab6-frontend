import React, { Component } from 'react'
import {
    updateFourteener,
    fetchOneFourteener,
    fetchMtnRanges,
    deleteFourteener
} from './utils.js'


const userFromWherever = {
    userId: 1
};

export default class UpdatePage extends Component {

    state = {
        mtn_ranges: [],
        name: '',
        elevation: 0,
        drive_to_top: true,
        mtn_range_id: 1
    }

    componentDidMount = async () => {
        const mtn_ranges = await fetchMtnRanges();
        const fourteener = await fetchOneFourteener(this.props.match.params.id);

        this.setState({
            name: fourteener.name,
            elevation: fourteener.elevation,
            drive_to_top: fourteener.drive_to_top,
            mtn_range_id: fourteener.mtn_range_id,
            mtn_ranges: mtn_ranges
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await updateFourteener(this.props.match.params.id,
            {
                name: this.state.name,
                elevation: this.state.elevation,
                mtn_range_id: this.state.mtn_range_id,
                drive_to_top: this.state.drive_to_top,
                owner_id: userFromWherever.userId
            })
        this.props.history.push('/');
    }

    handleDelete = async (e) => {
        alert('Are you sure you want to delete this fourteener from the list?')
        await deleteFourteener(this.props.match.params.id)

        this.props.history.push('/');
    }

    render() {

        console.log(this.state);

        return (
            <div className='update-div'>
                <h2>Update a Fourteener</h2>
                <form className='update-form'
                    onSubmit={this.handleSubmit}>
                    <label>
                        Fourteener Name
                        <input value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />
                    </label>
                    <label>
                        Elevation
                        <input value={this.state.elevation}
                            onChange={e => this.setState({ elevation: e.target.value })} type='number' />
                    </label>
                    <label>
                        Mountain Range
                        <select onChange={this.handleChange} >
                            {
                                this.state.mtn_ranges.map(range => <option
                                    selected={this.state.mtn_range_id === range.id}
                                    key={range.id} value={range.id}>
                                    {range.name}
                                </option>)
                            }
                        </select>
                    </label>
                    <label>
                        Can You Drive to the Top?
                        <select value={this.state.drive_to_top} onChange={e => this.setState({ drive_to_top: e.target.value })}>
                            <option ></option>
                            <option value='true'>Yes</option>
                            <option value='false'>Nope</option>
                        </select>
                    </label>
                    <button className='submit-button'>Submit Changes</button>
                </form>
                <button className='delete-button' onClick={this.handleDelete}>DELETE from the list</button>
            </div>
        )
    }
}
