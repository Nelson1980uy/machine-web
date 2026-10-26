import operador from "./assets/operador.png";
import "./App.css";

import {
  useEffect,
  useState,
} from "react";



const MACHINE_RELEASES_API =
  "https://api.github.com/repos/Nelson1980uy/machine-releases/releases/latest";

async function getLatestMachineRelease() {
  const response = await fetch(MACHINE_RELEASES_API, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(
      "No se pudo consultar la última versión de MACHINE."
    );
  }

  const release = await response.json();

  const installer = release.assets?.find((asset) =>
    /^MACHINE-Setup-.*\.exe$/i.test(asset.name)
  );

  if (!installer || release.draft || release.prerelease) {
    throw new Error(
      "La última publicación no contiene un instalador estable de MACHINE."
    );
  }

  return {
    version: release.tag_name,
    downloadUrl: installer.browser_download_url,
  };
}


function App() {

  const [showBackToTop, setShowBackToTop] =
    useState(false);

    
const [latestRelease, setLatestRelease] = useState(null);
const [releaseLoading, setReleaseLoading] = useState(true);
const [releaseError, setReleaseError] = useState("");


  useEffect(() => {
    let cancelled = false;

    const loadLatestRelease = async () => {
      setReleaseLoading(true);
      setReleaseError("");

      try {
        const release = await getLatestMachineRelease();

        if (!cancelled) {
          setLatestRelease(release);
        }
      } catch (error) {
        console.error(
          "MACHINE RELEASE CHECK ERROR:",
          error
        );

        if (!cancelled) {
          setLatestRelease(null);
          setReleaseError(
            error instanceof Error
              ? error.message
              : "No se pudo consultar la versión de MACHINE."
          );
        }
      } finally {
        if (!cancelled) {
          setReleaseLoading(false);
        }
      }
    };

    loadLatestRelease();

    return () => {
      cancelled = true;
    };
  }, []);



      // =========================================================
  // MACHINE DOWNLOAD CENTER
  // =========================================================

  const [showDownloadModal, setShowDownloadModal] =
    useState(false);

  const [downloadProgress, setDownloadProgress] =
    useState(0);

  const [downloadReady, setDownloadReady] =
    useState(false);

  const openDownloadModal = () => {
    setDownloadProgress(0);
    setDownloadReady(false);
    setShowDownloadModal(true);
  };

  const closeDownloadModal = () => {
    setShowDownloadModal(false);
  };

  useEffect(() => {
    if (!showDownloadModal) {
      return undefined;
    }

    setDownloadProgress(0);
    setDownloadReady(false);

    let progress = 0;

    const interval = window.setInterval(() => {
      progress = Math.min(progress + 2, 100);

      setDownloadProgress(progress);

      if (progress >= 100) {
        window.clearInterval(interval);
        setDownloadReady(true);
      }
    }, 60);

    return () => {
      window.clearInterval(interval);
    };
  }, [showDownloadModal]);




  useEffect(() => {

    const handleScroll = () => {

      setShowBackToTop(
        window.scrollY > 10
      );

    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, []);






  // =========================================================
  // API
  // =========================================================

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080";


  // =========================================================
  // COMMUNITY
  // =========================================================

  const [communityForm, setCommunityForm] =
    useState({
      name: "",
      email: "",
      comment: "",
    });

  const [communityComments, setCommunityComments] =
    useState([]);

  const [communityLoading, setCommunityLoading] =
    useState(false);

  const [communityMessage, setCommunityMessage] =
    useState("");

  const [communityError, setCommunityError] =
    useState("");


  // =========================================================
  // SUPPORT
  // =========================================================

  const [supportForm, setSupportForm] =
    useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  const [supportLoading, setSupportLoading] =
    useState(false);

  const [supportMessage, setSupportMessage] =
    useState("");

  const [supportError, setSupportError] =
    useState("");


  // =========================================================
  // CARGAR COMENTARIOS APROBADOS
  // =========================================================

  const loadCommunityComments =
    async () => {

      try {

        const response = await fetch(
          `${API_URL}/api/public/comments`
        );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data?.message ||
              "No fue posible cargar los comentarios."
          );

        }

        setCommunityComments(
          Array.isArray(data?.data)
            ? data.data
            : []
        );

      } catch (error) {

        console.error(
          "COMMUNITY LOAD ERROR:",
          error
        );

      }

    };


  // =========================================================
  // ENVIAR COMENTARIO
  // =========================================================

  const handleCommunitySubmit =
    async (event) => {

      event.preventDefault();

      if (communityLoading) {
        return;
      }

      setCommunityLoading(true);
      setCommunityMessage("");
      setCommunityError("");

      try {

        const response =
          await fetch(
            `${API_URL}/api/public/comments`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                name:
                  communityForm.name.trim(),

                email:
                  communityForm.email
                    .trim()
                    .toLowerCase(),

                message:
                  communityForm.comment.trim(),
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data?.message ||
              "No fue posible enviar el comentario."
          );

        }

        setCommunityForm({
          name: "",
          email: "",
          comment: "",
        });

        setCommunityMessage(
          "COMENTARIO RECIBIDO · QUEDARÁ PENDIENTE DE MODERACIÓN."
        );

      } catch (error) {

        console.error(
          "COMMUNITY POST ERROR:",
          error
        );

        setCommunityError(
          error.message ||
            "No fue posible enviar el comentario."
        );

      } finally {

        setCommunityLoading(false);

      }

    };


  // =========================================================
  // ENVIAR SOLICITUD DE SOPORTE
  // =========================================================

  const handleSupportSubmit =
    async (event) => {

      event.preventDefault();

      if (supportLoading) {
        return;
      }

      setSupportLoading(true);
      setSupportMessage("");
      setSupportError("");

      try {

        const response =
          await fetch(
            `${API_URL}/api/public/support`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                name:
                  supportForm.name.trim(),

                email:
                  supportForm.email
                    .trim()
                    .toLowerCase(),

                subject:
                  supportForm.subject.trim(),

                message:
                  supportForm.message.trim(),
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data?.message ||
              "No fue posible enviar la solicitud."
          );

        }

        setSupportForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setSupportMessage(
          "SOLICITUD RECIBIDA · TUS DATOS FUERON GUARDADOS CORRECTAMENTE."
        );

      } catch (error) {

        console.error(
          "SUPPORT POST ERROR:",
          error
        );

        setSupportError(
          error.message ||
            "No fue posible enviar la solicitud."
        );

      } finally {

        setSupportLoading(false);

      }

    };


  // =========================================================
  // CARGAR COMENTARIOS AL INICIAR
  // =========================================================

  useEffect(() => {

    loadCommunityComments();

  }, []);


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="machine-site">

      {/* =================================================
          HEADER
         ================================================= */}

      <header className="machine-header">

        <div className="machine-brand">

          <div
            className="machine-empty-symbol notranslate"
            translate="no"
          >
            M
          </div>

          <div className="machine-brand-text">

            <strong>
              MACHINE
            </strong>

            <span>
              OFFICIAL SYSTEM
            </span>

          </div>

        </div>


        <nav className="machine-nav">

          <a href="#machine">
            MACHINE
          </a>

          <a href="#funciones">
            FUNCIONES
          </a>

          <a href="#descargas">
            DESCARGAS
          </a>

          <a href="#faq">
            FAQ
          </a>

          <a href="#soporte">
            SOPORTE
          </a>

        </nav>


        <a
          className="machine-download-button"
          href="#descargas"
        >
          DESCARGAR APP
        </a>

      </header>


      {/* =================================================
          CONTENIDO PRINCIPAL
         ================================================= */}

      <main>

        {/* =================================================
            PORTADA
           ================================================= */}

        <section
          id="inicio"
          className="machine-hero"
        >

          <div className="machine-hero-content">

            <span className="machine-eyebrow">
              ● SISTEMA DIGITAL PARA OPERACIONES
            </span>

            <h1>

              MACHINE

              <span>
                CONTROL · COMMUNICATION · OPERATIONS
              </span>

            </h1>

            <p>

              Una plataforma digital diseñada para
              centralizar comunicación, información,
              operadores y herramientas de trabajo
              dentro de un entorno industrial moderno.

            </p>


            <div className="machine-hero-actions">

              <a
                href="#descargas"
                className="machine-button machine-button-primary"
              >
                DESCARGAR MACHINE
              </a>

              <a
                href="#machine"
                className="machine-button machine-button-secondary"
              >
                CONOCER MACHINE
              </a>

            </div>

          </div>


          <div className="machine-hero-operator">

            <div className="machine-system-readout machine-system-readout-top">

              <span>
                MACHINE CORE
              </span>

              <strong>
                READY
              </strong>

            </div>


            <div className="machine-operator-frame">

              <img
                src={operador}
                alt="Operador MACHINE"
                className="machine-operator-image"
              />

              <div className="machine-scan-line"></div>

            </div>


            <div className="machine-system-readout machine-system-readout-bottom">

              <span>
                OPERATOR NETWORK
              </span>

              <strong>
                ACTIVE
              </strong>

            </div>


            <div className="machine-operator-status">

              <span>
                MACHINE OFFICIAL
              </span>

              <strong>
                ● SYSTEM ONLINE
              </strong>

            </div>

          </div>

        </section>


        {/* =================================================
            QUÉ ES MACHINE
           ================================================= */}

        <section
          id="machine"
          className="machine-section machine-about-section"
        >

          <div className="machine-section-heading">

            <div>

              <span className="machine-section-label">
                01 · THE SYSTEM
              </span>

              <h2>
                ¿QUÉ ES
                <span>
                  MACHINE?
                </span>
              </h2>

            </div>


            <div className="machine-about-status">

              <span>
                SYSTEM
              </span>

              <strong>
                ● ACTIVE
              </strong>

            </div>

          </div>


          <div className="machine-about-intro">

            <p className="machine-about-main-text">

              MACHINE es una plataforma digital orientada
              a entornos industriales y operaciones donde
              la comunicación, la información y la
              coordinación entre operadores forman parte
              del trabajo diario.

            </p>


            <p className="machine-about-secondary-text">

              El proyecto busca reunir diferentes
              herramientas en una única interfaz,
              manteniendo una experiencia clara,
              organizada y preparada para evolucionar
              junto con las necesidades de sus usuarios.

            </p>

          </div>


          <div className="machine-about-grid">

            <article className="machine-about-card">

              <span className="machine-about-card-index">
                01
              </span>

              <strong>
                OPERACIÓN
              </strong>

              <p>
                Una interfaz pensada para organizar
                herramientas y procesos dentro de un
                entorno de trabajo digital.
              </p>

            </article>


            <article className="machine-about-card">

              <span className="machine-about-card-index">
                02
              </span>

              <strong>
                COMUNICACIÓN
              </strong>

              <p>
                Conexión entre operadores mediante
                comunicación directa y herramientas
                en tiempo real.
              </p>

            </article>


            <article className="machine-about-card">

              <span className="machine-about-card-index">
                03
              </span>

              <strong>
                EVOLUCIÓN
              </strong>

              <p>
                MACHINE está diseñada para crecer
                incorporando nuevas funciones y
                tecnologías a medida que el sistema
                evoluciona.
              </p>

            </article>

          </div>

        </section>


        {/* =================================================
            FUNCIONES
           ================================================= */}

        <section
          id="funciones"
          className="machine-section"
        >

          <span className="machine-section-label">
            02 · CAPABILITIES
          </span>

          <h2>
            FUNCIONES PRINCIPALES
          </h2>


          <div className="machine-feature-grid">

            <article className="machine-feature-card">

              <strong>
                OPERADORES
              </strong>

              <p>
                Visualización y presencia de operadores
                conectados dentro del sistema.
              </p>

            </article>


            <article className="machine-feature-card">

              <strong>
                CHAT PRIVADO
              </strong>

              <p>
                Comunicación directa y persistente
                entre operadores.
              </p>

            </article>


            <article className="machine-feature-card">

              <strong>
                MULTIMEDIA
              </strong>

              <p>
                Envío de imágenes, audio, vídeo y
                archivos.
              </p>

            </article>


            <article className="machine-feature-card">

              <strong>
                TIEMPO REAL
              </strong>

              <p>
                Comunicación y presencia mediante
                tecnología en tiempo real.
              </p>

            </article>

          </div>

        </section>


           
      
    {/* =================================================
        DESCARGAS MACHINE
       ================================================= */}

    <section
      id="descargas"
      className="machine-section machine-download-section"
    >
      <span className="machine-section-label">
        03 · MACHINE ACCESS CENTER
      </span>

      <h2>
        DESCARGAR MACHINE
      </h2>

      <p>
        Accede a la plataforma oficial MACHINE desde tu
        ordenador, tablet o dispositivo móvil.
      </p>

      <div className="machine-download-grid">

        {/* DESCARGA PARA WINDOWS */}
        <article className="machine-download-card">

          <img
            src={operador}
            alt="Operador oficial de MACHINE"
            className="machine-download-operator"
          />

          <strong>
            MACHINE · WINDOWS
          </strong>

          <span>
            Descarga el instalador oficial de MACHINE
            para tu PC con Windows.
          </span>

          {releaseLoading ? (
            <button
              type="button"
              className="machine-download-button"
              disabled
            >
              CONSULTANDO VERSIÓN...
            </button>
          ) : latestRelease ? (
            <>
              <span className="machine-download-version">
                VERSIÓN DISPONIBLE: {latestRelease.version}
              </span>

              <a
                href={latestRelease.downloadUrl}
                className="machine-download-button"
              >
                DESCARGAR PARA WINDOWS
              </a>
            </>
          ) : (
            <div role="status">
              <p>
                {releaseError ||
                  "El instalador no está disponible temporalmente."}
              </p>

              <button
                type="button"
                className="machine-download-button"
                onClick={() => window.location.reload()}
              >
                REINTENTAR
              </button>
            </div>
          )}

        </article>

        
      {/* DESCARGA DE LA APLICACIÓN ANDROID */}
      <article className="machine-download-card">
        <img
          src={operador}
          alt="Operador oficial de MACHINE"
          className="machine-download-operator"
        />

        <strong>MACHINE · ANDROID</strong>

        <span>
          Descarga la aplicación oficial de MACHINE para
          dispositivos Android e instálala en tu dispositivo.
        </span>

        

<a
  href="https://github.com/Nelson1980uy/machine-releases/releases/latest/download/MACHINE-Android.apk"
  className="machine-download-button"
>
  DESCARGAR APP PARA ANDROID
</a>



        <small>
          Archivo de instalación APK para Android.
        </small>
      </article>


        {/* ACCESO A MACHINE ONLINE */}
        <article className="machine-download-card">

          <img
            src={operador}
            alt="Operador oficial de MACHINE"
            className="machine-download-operator"
          />

          <strong>
            MACHINE · WEB
          </strong>

          <span>
            Accede a MACHINE desde tu navegador, sin instalar
            el programa de escritorio.
          </span>

          <a
            href="https://machine-official.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="machine-download-button"
          >
            ENTRAR A MACHINE ONLINE
          </a>

        </article>

      </div>
    </section>




        {/* =================================================
            COMUNIDAD + SOPORTE
           ================================================= */}

        <section
          id="soporte"
          className="machine-section machine-community-section"
        >

          <div className="machine-section-heading">

            <div>

              <span className="machine-section-label">
                04 · COMMUNITY & SUPPORT
              </span>

              <h2>

                MACHINE

                <span>
                  COMMUNITY
                </span>

              </h2>

            </div>


            <div className="machine-about-status">

              <span>
                NETWORK
              </span>

              <strong>
                ● READY
              </strong>

            </div>

          </div>


          <p className="machine-community-intro">

            Comparte tu experiencia con MACHINE,
            envía tus consultas o ponte en contacto
            con el equipo del sistema.

          </p>


          {/* =================================================
              COMMUNITY FEEDBACK
             ================================================= */}

          <div
            id="comunidad"
            className="machine-community-panel"
          >

            <div className="machine-community-header">

              <div>

                <span className="machine-panel-code">
                  COMMUNITY FEEDBACK
                </span>

                <h3>
                  COMPARTE TU EXPERIENCIA
                </h3>

              </div>


              <span className="machine-panel-status">
                ● OPEN
              </span>

            </div>


            <div className="machine-community-layout">

              {/* =================================================
                  FORMULARIO COMUNIDAD
                 ================================================= */}

              <form
                className="machine-form"
                onSubmit={handleCommunitySubmit}
              >

                <label>

                  NOMBRE

                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    autoComplete="name"
                    value={communityForm.name}
                    onChange={(event) => {

                      setCommunityForm(
                        (current) => ({
                          ...current,
                          name:
                            event.target.value,
                        })
                      );

                      setCommunityMessage("");
                      setCommunityError("");

                    }}
                    required
                    maxLength={120}
                  />

                </label>


                <label>

                  CORREO

                  <input
                    type="email"
                    name="email"
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    value={communityForm.email}
                    onChange={(event) => {

                      setCommunityForm(
                        (current) => ({
                          ...current,
                          email:
                            event.target.value,
                        })
                      );

                      setCommunityMessage("");
                      setCommunityError("");

                    }}
                    required
                    maxLength={254}
                  />

                </label>


                <label>

                  COMENTARIO

                  <textarea
                    name="comment"
                    placeholder="Escribe tu experiencia con MACHINE..."
                    value={communityForm.comment}
                    onChange={(event) => {

                      setCommunityForm(
                        (current) => ({
                          ...current,
                          comment:
                            event.target.value,
                        })
                      );

                      setCommunityMessage("");
                      setCommunityError("");

                    }}
                    required
                    minLength={5}
                    maxLength={2000}
                  ></textarea>

                </label>


                {communityError && (

                  <div className="machine-public-error">

                    {communityError}

                  </div>

                )}


                {communityMessage && (

                  <div className="machine-public-success">

                    {communityMessage}

                  </div>

                )}


                <button
                  type="submit"
                  className="machine-form-button"
                  disabled={communityLoading}
                >

                  <span>

                    {communityLoading
                      ? "ENVIANDO..."
                      : "PUBLICAR COMENTARIO"}

                  </span>

                </button>

              </form>


              {/* =================================================
                  LISTA DE COMENTARIOS
                 ================================================= */}

              <div className="machine-community-list">

                <div className="machine-community-list-header">

                  <span>
                    COMMUNITY FEEDBACK
                  </span>

                  <strong>
                    {String(
                      communityComments.length
                    ).padStart(2, "0")}
                  </strong>

                </div>


                {communityComments.length === 0 ? (

                  <div className="machine-community-empty">

                    <div
                      className="machine-empty-symbol notranslate"
                      translate="no"
                    >
                      M
                    </div>

                    <strong>
                      AÚN NO HAY COMENTARIOS
                    </strong>

                    <p>
                      Sé uno de los primeros en compartir
                      tu experiencia con MACHINE.
                    </p>

                  </div>

                ) : (

                  <div className="machine-comment-items">

                    {communityComments.map(
                      (comment) => (

                        <article
                          key={comment.id}
                          className="machine-comment-item"
                        >

                          <div className="machine-comment-top">

                            <strong>
                              {comment.name}
                            </strong>

                            <span>
                              {new Date(
                                comment.created_at
                              ).toLocaleDateString(
                                "es-UY"
                              )}
                            </span>

                          </div>


                          <p>
                            {comment.message}
                          </p>

                        </article>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>

          </div>


          {/* =================================================
              SOPORTE
             ================================================= */}

          <div
            id="soporte-formulario"
            className="machine-support-panel"
          >

            <div className="machine-community-header">

              <div>

                <span className="machine-panel-code">
                  MACHINE SUPPORT
                </span>

                <h3>
                  ¿NECESITAS AYUDA?
                </h3>

              </div>


              <span className="machine-panel-status machine-support-status">
                ● AVAILABLE
              </span>

            </div>


            <form
              className="machine-form machine-support-form"
              onSubmit={handleSupportSubmit}
            >

              <div className="machine-form-row">

                <label>

                  NOMBRE

                  <input
                    type="text"
                    name="supportName"
                    placeholder="Tu nombre"
                    autoComplete="name"
                    value={supportForm.name}
                    onChange={(event) => {

                      setSupportForm(
                        (current) => ({
                          ...current,
                          name:
                            event.target.value,
                        })
                      );

                      setSupportMessage("");
                      setSupportError("");

                    }}
                    required
                    maxLength={120}
                  />

                </label>


                <label>

                  CORREO

                  <input
                    type="email"
                    name="supportEmail"
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    value={supportForm.email}
                    onChange={(event) => {

                      setSupportForm(
                        (current) => ({
                          ...current,
                          email:
                            event.target.value,
                        })
                      );

                      setSupportMessage("");
                      setSupportError("");

                    }}
                    required
                    maxLength={254}
                  />

                </label>

              </div>


              <label>

                ASUNTO

                <input
                  type="text"
                  name="subject"
                  placeholder="¿En qué podemos ayudarte?"
                  value={supportForm.subject}
                  onChange={(event) => {

                    setSupportForm(
                      (current) => ({
                        ...current,
                        subject:
                          event.target.value,
                      })
                    );

                    setSupportMessage("");
                    setSupportError("");

                  }}
                  required
                  maxLength={180}
                />

              </label>


              <label>

                MENSAJE

                <textarea
                  name="message"
                  placeholder="Describe tu consulta..."
                  value={supportForm.message}
                  onChange={(event) => {

                    setSupportForm(
                      (current) => ({
                        ...current,
                        message:
                          event.target.value,
                      })
                    );

                    setSupportMessage("");
                    setSupportError("");

                  }}
                  required
                  minLength={5}
                  maxLength={5000}
                ></textarea>

              </label>


              {supportError && (

                <div className="machine-public-error">

                  {supportError}

                </div>

              )}


              {supportMessage && (

                <div className="machine-public-success">

                  {supportMessage}

                </div>

              )}


              <button
                type="submit"
                className="machine-form-button"
                disabled={supportLoading}
              >

                <span>

                  {supportLoading
                    ? "ENVIANDO..."
                    : "ENVIAR SOLICITUD"}

                </span>

              </button>

            </form>

          </div>

        </section>


        {/* =================================================
            FAQ
           ================================================= */}

        <section
          id="faq"
          className="machine-section machine-faq-section"
        >

          <span className="machine-section-label">
            05 · FREQUENTLY ASKED QUESTIONS
          </span>

          <h2>

            PREGUNTAS

            <span>
              FRECUENTES
            </span>

          </h2>


          <p className="machine-faq-intro">

            Información rápida sobre MACHINE,
            sus funciones y su disponibilidad.

          </p>


          <div className="machine-faq-list">

            <details
              className="machine-faq-item"
              open
            >

              <summary>
                ¿QUÉ ES MACHINE?
              </summary>

              <p>
                MACHINE es una plataforma digital
                orientada a entornos industriales y a
                la comunicación entre operadores.
              </p>

            </details>


            <details className="machine-faq-item">

              <summary>
                ¿QUÉ FUNCIONES OFRECE?
              </summary>

              <p>
                MACHINE incorpora presencia de
                operadores, comunicación en tiempo real,
                chat privado e intercambio de imágenes,
                audio, vídeo y archivos.
              </p>

            </details>


            <details className="machine-faq-item">

             
<summary>
  ¿DÓNDE PUEDO DESCARGAR MACHINE?
</summary>

<p>
  MACHINE ya está disponible para Windows y también
  puedes acceder a su plataforma web desde tu navegador.
  Visita el centro de acceso oficial para descargar
  la aplicación de escritorio o entrar a MACHINE Online.
</p>

            </details>


            <details className="machine-faq-item">

             
<summary>
  ¿MACHINE ESTÁ DISPONIBLE PARA PC Y MÓVILES?
</summary>

<p>
  Sí. Puedes acceder a MACHINE desde tu PC o dispositivo
  móvil a través de la plataforma web oficial, utilizando
  un navegador compatible. La aplicación de escritorio
  está disponible para Windows y ofrece una experiencia
  diseñada para el entorno industrial.
</p>


            </details>


            <details className="machine-faq-item">

              <summary>
                ¿CÓMO PUEDO RECIBIR SOPORTE?
              </summary>

              <p>
                Puedes utilizar el formulario de soporte
                disponible en esta página para enviar
                consultas al equipo de MACHINE.
              </p>

            </details>

          </div>

        </section>


        {/* =================================================
            POLÍTICA DE PRIVACIDAD
           ================================================= */}

        <section
          id="privacidad"
          className="machine-section machine-legal-section"
        >

          <span className="machine-section-label">
            06 · LEGAL
          </span>


          <div className="machine-privacy-heading">

            <div>

              <span className="machine-privacy-code">
                MACHINE / PRIVACY
              </span>

              <h2>
                POLÍTICA DE PRIVACIDAD
              </h2>

              <p className="machine-privacy-intro">

                Información sobre el tratamiento de datos,
                comunicación y uso de las funciones de MACHINE.

              </p>

            </div>


            <div className="machine-privacy-version">
              VERSION 1.0
            </div>

          </div>


          <div className="machine-privacy-line"></div>


          <div className="machine-privacy-content">

            {/* =====================================================
                01
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                01
              </span>

              <div>

                <h3>
                  SOBRE MACHINE
                </h3>

                <p>
                  MACHINE es una plataforma orientada a
                  entornos de trabajo industriales y diseñada
                  para facilitar la operación, organización,
                  comunicación y gestión de información.
                </p>

                <p>
                  Dependiendo de las funciones habilitadas,
                  los usuarios podrán disponer de perfiles,
                  mensajería, publicaciones, imágenes,
                  archivos, presencia de usuarios y
                  funciones de comunicación mediante llamadas.
                </p>

              </div>

            </article>


            {/* =====================================================
                02
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                02
              </span>

              <div>

                <h3>
                  DATOS QUE PODEMOS TRATAR
                </h3>

                <p>
                  Dependiendo de las funciones utilizadas,
                  MACHINE podrá tratar determinadas categorías
                  de información, entre ellas:
                </p>

                <ul>

                  <li>
                    Nombre y apellido.
                  </li>

                  <li>
                    Identificador laboral de seis dígitos.
                  </li>

                  <li>
                    Fotografía de perfil, cuando el usuario
                    decida proporcionarla.
                  </li>

                  <li>
                    Información adicional que el usuario
                    decida incluir en su perfil.
                  </li>

                  <li>
                    Mensajes y contenido compartido mediante
                    las funciones de comunicación.
                  </li>

                  <li>
                    Imágenes, documentos y otros archivos
                    enviados mediante la plataforma.
                  </li>

                  <li>
                    Información relacionada con presencia,
                    estado de conexión o actividad visible
                    dentro de las funciones correspondientes.
                  </li>

                  <li>
                    Información técnica necesaria para operar,
                    mantener, proteger y diagnosticar el servicio.
                  </li>

                </ul>

              </div>

            </article>


            {/* =====================================================
                03
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                03
              </span>

              <div>

                <h3>
                  PARA QUÉ UTILIZAMOS LOS DATOS
                </h3>

                <p>
                  La información podrá utilizarse para crear
                  y administrar cuentas, identificar usuarios,
                  proporcionar funciones de comunicación,
                  gestionar perfiles, facilitar el intercambio
                  de contenido y mantener la seguridad y
                  funcionamiento de MACHINE.
                </p>

                <p>
                  Cada tratamiento deberá estar relacionado
                  con la finalidad correspondiente y con las
                  funciones que realmente se encuentren
                  habilitadas en la plataforma.
                </p>

              </div>

            </article>


            {/* =====================================================
                04
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                04
              </span>

              <div>

                <h3>
                  PERFIL Y VISIBILIDAD
                </h3>

                <p>
                  Algunas funciones podrán permitir que otros
                  usuarios visualicen determinados datos del
                  perfil, como nombre, apellido, fotografía,
                  rol o estado de conexión.
                </p>

                <p>
                  El identificador laboral se considera
                  información de identificación interna y
                  no deberá mostrarse públicamente salvo que
                  exista una finalidad operativa definida.
                </p>

              </div>

            </article>


            {/* =====================================================
                05
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                05
              </span>

              <div>

                <h3>
                  CHAT Y MENSAJES
                </h3>

                <p>
                  Los mensajes enviados mediante MACHINE podrán
                  ser procesados y almacenados cuando sea
                  necesario para su entrega, sincronización,
                  historial y funcionamiento.
                </p>

                <p>
                  Las condiciones concretas de almacenamiento,
                  acceso y eliminación dependerán de la
                  arquitectura definitiva del servicio.
                </p>

              </div>

            </article>


            {/* =====================================================
                06
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                06
              </span>

              <div>

                <h3>
                  IMÁGENES Y ARCHIVOS
                </h3>

                <p>
                  Las imágenes, documentos y otros archivos que
                  el usuario decida compartir podrán ser
                  almacenados y mostrados a los usuarios
                  autorizados según las reglas de cada función.
                </p>

                <p>
                  El usuario debe evitar compartir información
                  personal de terceros sin autorización,
                  documentación confidencial o contenido que
                  no tenga derecho a distribuir.
                </p>

              </div>

            </article>


            {/* =====================================================
                07
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                07
              </span>

              <div>

                <h3>
                  LLAMADAS Y COMUNICACIONES
                </h3>

                <p>
                  Las funciones de llamadas de audio y/o vídeo
                  podrán requerir información técnica de
                  conexión, identificadores de sesión y otros
                  datos necesarios para establecer y mantener
                  la comunicación.
                </p>

                <p>
                  MACHINE no indicará que una comunicación es
                  grabada, almacenada o cifrada de una manera
                  concreta hasta que esa característica haya
                  sido implementada y documentada técnicamente.
                </p>

              </div>

            </article>


            {/* =====================================================
                08
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                08
              </span>

              <div>

                <h3>
                  USUARIOS CONECTADOS
                </h3>

                <p>
                  Algunas funciones podrán mostrar el estado
                  de conexión o presencia de otros usuarios,
                  por ejemplo, conectado, ausente o desconectado.
                </p>

                <p>
                  La información visible dependerá de los
                  permisos y controles de privacidad definidos
                  para cada función.
                </p>

              </div>

            </article>


            {/* =====================================================
                09
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                09
              </span>

              <div>

                <h3>
                  SEGURIDAD
                </h3>

                <p>
                  MACHINE deberá aplicar medidas técnicas y
                  organizativas adecuadas para reducir el riesgo
                  de acceso no autorizado, pérdida, alteración
                  o divulgación indebida de información.
                </p>

                <p>
                  Ningún sistema conectado a Internet puede
                  garantizar un riesgo cero. La seguridad deberá
                  revisarse y mantenerse de forma continua.
                </p>

              </div>

            </article>


            {/* =====================================================
                10
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                10
              </span>

              <div>

                <h3>
                  CONSERVACIÓN DE LA INFORMACIÓN
                </h3>

                <p>
                  Los períodos de conservación deberán definirse
                  según la finalidad, el tipo de información,
                  las necesidades operativas y las obligaciones
                  legales aplicables.
                </p>

                <p>
                  Cuando corresponda, los datos deberán ser
                  eliminados o anonimizados de acuerdo con los
                  procedimientos establecidos para el servicio.
                </p>

              </div>

            </article>


            {/* =====================================================
                11
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                11
              </span>

              <div>

                <h3>
                  DERECHOS DEL USUARIO
                </h3>

                <p>
                  Los usuarios podrán disponer, según la
                  normativa aplicable, de mecanismos para
                  solicitar información sobre sus datos y,
                  cuando corresponda, ejercer derechos de
                  acceso, rectificación, actualización,
                  supresión u otros reconocidos por la
                  legislación aplicable.
                </p>

                <p>
                  Los procedimientos y canales definitivos
                  deberán publicarse junto con la información
                  de contacto del responsable correspondiente.
                </p>

              </div>

            </article>


            {/* =====================================================
                12
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                12
              </span>

              <div>

                <h3>
                  RESPONSABILIDAD DEL USUARIO
                </h3>

                <p>
                  El usuario es responsable de la información,
                  imágenes, documentos y demás contenido que
                  publique, envíe o comparta mediante MACHINE.
                </p>

                <p>
                  El uso de la plataforma deberá realizarse
                  respetando las normas internas de la
                  organización, los derechos de otras personas
                  y la legislación aplicable.
                </p>

              </div>

            </article>


            {/* =====================================================
                13
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                13
              </span>

              <div>

                <h3>
                  CAMBIOS EN ESTA POLÍTICA
                </h3>

                <p>
                  Esta política podrá actualizarse cuando
                  cambien las funciones, la infraestructura,
                  las prácticas de tratamiento de información
                  o los requisitos legales aplicables.
                </p>

                <p>
                  Cuando corresponda, las modificaciones
                  relevantes deberán comunicarse mediante los
                  mecanismos establecidos por MACHINE.
                </p>

              </div>

            </article>


            {/* =====================================================
                14
               ===================================================== */}

            <article className="machine-privacy-section">

              <span className="machine-privacy-number">
                14
              </span>

              <div>

                <h3>
                  CONTACTO
                </h3>

                <p>
                  Responsable del tratamiento:
                </p>

                <p className="machine-privacy-contact">

                  <strong>
                    Nelson Lapizaga
                  </strong>

                </p>

                <p>
                  Correo de privacidad:
                </p>

                <p className="machine-privacy-contact">

                  <strong>
                   machineofficialsupport@gmail.com 
                  </strong>

                </p>

                <p>
                  Dirección:
                </p>

                <p className="machine-privacy-contact">

                  <strong>
                    Pompilio García 825, Apartamento 5.
                  </strong>

                </p>

              </div>

            </article>

          </div>


          <div className="machine-privacy-note">

            Esta sección pública presenta la política
            informativa de MACHINE. La aceptación obligatoria
            y el registro de aceptación pertenecen
            exclusivamente al flujo de acceso de la aplicación.

          </div>

        </section>


        {/* =================================================
            TÉRMINOS
           ================================================= */}

        <section
          id="terminos"
          className="machine-section machine-legal-section"
        >

          <span className="machine-section-label">
            07 · LEGAL
          </span>

          <h2>

            TÉRMINOS

            <span>
              DE USO
            </span>

          </h2>


          <div className="machine-legal-panel">

            <strong>
              MACHINE TERMS OF USE
            </strong>

            <p>
              Los términos definitivos establecerán
              las condiciones de utilización de MACHINE,
              responsabilidades, disponibilidad del
              servicio y reglas aplicables a sus usuarios.
            </p>

            <p>
              El documento completo se incorporará
              antes de habilitar la distribución pública
              de la aplicación.
            </p>

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
         ================================================= */}

      <footer className="machine-footer">

        <div className="machine-footer-brand">

          <strong>
            MACHINE
          </strong>

          <span>
            OFFICIAL SYSTEM · 2026
          </span>

        </div>


        <nav className="machine-footer-links">

          <a href="#privacidad">
            PRIVACIDAD
          </a>

          <a href="#soporte">
            SOPORTE
          </a>

          <a href="#terminos">
            TÉRMINOS
          </a>

        </nav>

      </footer>


      {/* =================================================
          VOLVER ARRIBA
         ================================================= */}

      {showBackToTop && (

        <button
          type="button"
          className="machine-back-to-top"
          onClick={() => {

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });

          }}
          aria-label="Volver arriba"
        >

          <span>
            ↑
          </span>

          VOLVER ARRIBA

        </button>

      )}

            {/* =================================================
          MACHINE ACCESS MODAL
         ================================================= */}

      {showDownloadModal && (
        <div
          className="machine-access-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeDownloadModal();
            }
          }}
        >
          <section
            className="machine-access-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="machine-access-title"
          >
            <button
              type="button"
              className="machine-access-close"
              onClick={closeDownloadModal}
              aria-label="Cerrar ventana"
            >
              ×
            </button>

            <span className="machine-access-code">
              MACHINE CORE / ACCESS TERMINAL
            </span>

            <div className="machine-access-operator-frame">
              <img
                src={operador}
                alt="Operador MACHINE"
                className="machine-access-operator"
              />

              <span className="machine-access-scan" />
            </div>

            <h2 id="machine-access-title">
              {downloadReady
                ? "SISTEMA PREPARADO"
                : "INICIALIZANDO MACHINE"}
            </h2>

            <p className="machine-access-description">
              {downloadReady
                ? "El acceso a la plataforma oficial está preparado."
                : downloadProgress < 35
                  ? "Inicializando interfaz de acceso..."
                  : downloadProgress < 70
                    ? "Preparando los módulos de acceso..."
                    : "Finalizando la preparación del sistema..."}
            </p>

            <div
              className="machine-access-progress-track"
              role="progressbar"
              aria-label="Preparación del acceso"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={downloadProgress}
            >
              <span
                className="machine-access-progress-fill"
                style={{
                  width: `${downloadProgress}%`,
                }}
              />
            </div>

            <div className="machine-access-progress-info">
              <span>
                {downloadReady ? "READY" : "PREPARANDO ACCESO"}
              </span>

              <strong>
                {downloadProgress}%
              </strong>
            </div>

            {downloadReady ? (
              <a
                className="machine-access-enter"
                href="https://machine-official.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ENTRAR A MACHINE
                <span aria-hidden="true"> ↗</span>
              </a>
            ) : (
              <div className="machine-access-wait">
                ESPERANDO AUTORIZACIÓN DEL SISTEMA...
              </div>
            )}

            <span className="machine-access-footer">
              MACHINE OFFICIAL SYSTEM · 2026
            </span>
          </section>
        </div>
      )}

    </div>

    
  );
}

export default App;

