import PropTypes from "prop-types";

function Header({ role, page }) {
  return (
    <div className="w-full h-[6.8%] m-auto bg-primary-contrast rounded-2xl">
      <h2 className="font-bold text-[22px] py-5 pl-12">
        {role}
        <span className="font-light text-[22px] text-text-light">/{page}</span>
      </h2>
    </div>
  );
}

Header.propTypes = {
  role: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default Header;
