import SvgIcon from '@mui/material/SvgIcon';

export const TraditionalRoomIcon = ({ active }: { active: boolean }) => <SvgIcon color={ active ? 'primary' : 'inherit' } fill="currentColor">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="image">
    <path d="M1 43h48V7H1v36zm2-2v-7.586l11-11 10 10 17-17 6 6V41H3zM47 9v9.586l-6-6-17 17-10-10-11 11V9h44z">
    </path>
    <path d="M24 22c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5zm0-8c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z">
    </path>
  </svg>
</SvgIcon>

