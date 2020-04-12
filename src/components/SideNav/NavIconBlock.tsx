import React from 'react';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import NoteIcon from '@material-ui/icons/Note';
import {Link, useLocation} from 'react-router-dom';

const IconBlock = styled.div`
    width:100%;
    height:300px;
    
    .icon {
        color:rgba(255,255,255,.6);
        width:100%;
        font-size:2rem;
        cursor:pointer;
        margin:10px 0;
        &:hover {
            color:white;
        }
        
        transition:color .5s;
    }
    .${({path}:StyledProps) => path === '' ? 'home' : path} {
        color:white;
    }
`
type StyledProps = {
    path: string;
}

const NavIconBlock = () => {

    const location = useLocation();
    const path = location.pathname.replace(/\//g,'');
    console.log(path)
    return (
        <IconBlock path={path}>
            <Link to ="/" ><HomeIcon className="icon home"/></Link>
            <Link to ="/codeview" ><NoteIcon className="icon codeview"/></Link>
        </IconBlock>
    )
}

export default NavIconBlock;