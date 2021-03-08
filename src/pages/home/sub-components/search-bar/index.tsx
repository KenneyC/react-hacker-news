import React, { ChangeEvent, useState } from 'react';
import './index.scss';

interface SearchBarProps {
    handleSearchSubmit: (event: any, enteredText: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
    const { handleSearchSubmit } = props;
    const [ enteredText, setEnteredText ] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEnteredText(event.target.value);
    }
    
    return (
        <div className="search-bar-wrapper" onSubmit={(event) => handleSearchSubmit(event, enteredText)}>
            <form className="search-bar-form-wrapper">
                <label>
                    <input className="search-bar-body" type="text" onChange={handleChange} placeholder="Search"/>
                </label>
            </form>
        </div>
    )
}