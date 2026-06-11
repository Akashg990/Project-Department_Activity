export default function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const currentDate =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return (
    <div
      className="
        bg-white/90
        backdrop-blur-md
        border
        border-gray-200
        shadow-lg
        rounded-2xl
        px-6
        py-4
        flex
        items-center
        justify-between
      "
    >

      {/* Left Section */}
      <div>

        <h2
          className="
            text-3xl
            
            text-gray-800
          "
        >
          Dashboard
        </h2>

        <div
          className="
            flex
            items-center
            gap-3
            mt-1
          "
        >

          <p
            className="
              text-gray-500
              text-sm
            "
          >
            Welcome back 👋
          </p>

          <span
            className="
              hidden
              md:block
              text-gray-300
            "
          >
            |
          </span>

          <p
            className="
              hidden
              md:block
              text-sm
              text-gray-500
            "
          >
            {currentDate}
          </p>

        </div>

      </div>

      {/* Right Section */}
      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div className="text-right">

          <h3
            className="
              font-semibold
              text-gray-800
            "
          >
            {user?.name}
          </h3>

          <p
            className="
              text-sm
              text-blue-600
              capitalize
              font-medium
            "
          >
            {user?.role}
          </p>

        </div>

        {/* Avatar */}
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-indigo-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-lg
            shadow-lg
            hover:scale-105
            transition
            duration-200
            cursor-pointer
          "
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

      </div>

    </div>
  );
}