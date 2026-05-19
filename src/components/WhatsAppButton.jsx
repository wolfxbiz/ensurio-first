const WA_NUMBER = '971509765976' // +971 50 976 5976
const WA_MESSAGE = 'Hello! I found Ensurio First online and would like to learn more about your services.'

const styles = {
  btn: {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    zIndex: 9999,
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
}

export default function WhatsAppButton() {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.btn}
      aria-label="Chat on WhatsApp"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)'
        e.currentTarget.style.boxShadow = '0 6px 22px rgba(37,211,102,0.6)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.45)'
      }}
    >
      {/* WhatsApp SVG icon */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.49.651 4.823 1.79 6.843L2 30l7.343-1.767A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          fill="#fff"
        />
        <path
          d="M16 4.5C9.596 4.5 4.5 9.596 4.5 16c0 2.262.638 4.376 1.745 6.17L4.5 27.5l5.494-1.73A11.46 11.46 0 0016 27.5c6.404 0 11.5-5.096 11.5-11.5S22.404 4.5 16 4.5z"
          fill="#25D366"
        />
        <path
          d="M21.77 18.617c-.295-.148-1.748-.862-2.019-.961-.27-.099-.467-.148-.663.148-.197.295-.763.961-.935 1.158-.172.197-.344.222-.639.074-.295-.148-1.245-.459-2.372-1.464-.877-.781-1.468-1.747-1.64-2.042-.172-.295-.018-.454.129-.601.132-.132.295-.344.443-.516.148-.172.197-.295.295-.492.099-.197.049-.37-.025-.517-.074-.148-.663-1.6-.908-2.19-.24-.577-.483-.498-.663-.507l-.565-.01c-.197 0-.517.074-.787.37s-1.033 1.01-1.033 2.462 1.057 2.856 1.205 3.054c.148.197 2.08 3.175 5.04 4.453.705.304 1.255.486 1.684.622.707.225 1.351.193 1.86.117.567-.085 1.748-.714 1.995-1.404.246-.69.246-1.281.172-1.404-.073-.123-.27-.197-.565-.344z"
          fill="#fff"
        />
      </svg>
    </a>
  )
}
