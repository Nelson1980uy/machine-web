import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080";

const INITIAL_COMMENT = {
  name: "",
  email: "",
  message: "",
};

const INITIAL_SUPPORT = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function PublicCommunitySupport() {

  const [
    commentForm,
    setCommentForm,
  ] = useState(
    INITIAL_COMMENT
  );

  const [
    supportForm,
    setSupportForm,
  ] = useState(
    INITIAL_SUPPORT
  );

  const [
    comments,
    setComments,
  ] = useState([]);

  const [
    commentLoading,
    setCommentLoading,
  ] = useState(false);

  const [
    supportLoading,
    setSupportLoading,
  ] = useState(false);

  const [
    commentMessage,
    setCommentMessage,
  ] = useState("");

  const [
    supportMessage,
    setSupportMessage,
  ] = useState("");

  const [
    commentError,
    setCommentError,
  ] = useState("");

  const [
    supportError,
    setSupportError,
  ] = useState("");

  // =========================================================
  // CARGAR COMENTARIOS APROBADOS
  // =========================================================

  const loadComments =
    async () => {

      try {

        const response =
          await fetch(
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

        setComments(
          Array.isArray(data?.data)
            ? data.data
            : []
        );

      } catch (error) {

        console.error(
          "PUBLIC COMMENTS LOAD ERROR:",
          error
        );

      }

    };

  useEffect(() => {

    loadComments();

  }, []);

  // =========================================================
  // CAMBIOS COMENTARIO
  // =========================================================

  const handleCommentChange =
    (event) => {

      const {
        name,
        value,
      } = event.target;

      setCommentForm(
        previous => ({
          ...previous,
          [name]: value,
        })
      );

      setCommentError("");
      setCommentMessage("");

    };

  // =========================================================
  // CAMBIOS SOPORTE
  // =========================================================

  const handleSupportChange =
    (event) => {

      const {
        name,
        value,
      } = event.target;

      setSupportForm(
        previous => ({
          ...previous,
          [name]: value,
        })
      );

      setSupportError("");
      setSupportMessage("");

    };

  // =========================================================
  // ENVIAR COMENTARIO
  // =========================================================

  const handleCommentSubmit =
    async (event) => {

      event.preventDefault();

      if (commentLoading) {
        return;
      }

      setCommentError("");
      setCommentMessage("");
      setCommentLoading(true);

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
                  commentForm.name.trim(),

                email:
                  commentForm.email
                    .trim()
                    .toLowerCase(),

                message:
                  commentForm.message.trim(),
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

        setCommentForm(
          INITIAL_COMMENT
        );

        setCommentMessage(
          "COMENTARIO RECIBIDO · QUEDARÁ PENDIENTE DE MODERACIÓN."
        );

      } catch (error) {

        console.error(
          "PUBLIC COMMENT POST ERROR:",
          error
        );

        setCommentError(
          error.message ||
          "No fue posible enviar el comentario."
        );

      } finally {

        setCommentLoading(false);

      }

    };

  // =========================================================
  // ENVIAR SOPORTE
  // =========================================================

  const handleSupportSubmit =
    async (event) => {

      event.preventDefault();

      if (supportLoading) {
        return;
      }

      setSupportError("");
      setSupportMessage("");
      setSupportLoading(true);

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

        setSupportForm(
          INITIAL_SUPPORT
        );

        setSupportMessage(
          "SOLICITUD RECIBIDA · TUS DATOS FUERON GUARDADOS CORRECTAMENTE."
        );

      } catch (error) {

        console.error(
          "PUBLIC SUPPORT POST ERROR:",
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

  return (
    <>

      {/* =====================================================
          COMUNIDAD
         ===================================================== */}

      <section
        id="comunidad"
        className="machine-section machine-community-section"
      >

        <span className="machine-section-label">
          05 · COMMUNITY
        </span>

        <div className="machine-section-heading">

          <div>

            <span className="machine-community-code">
              MACHINE / COMMUNITY
            </span>

            <h2>
              COMUNIDAD
            </h2>

            <p className="machine-community-intro">
              Comparte tu experiencia con MACHINE.
              Los comentarios son revisados antes
              de publicarse públicamente.
            </p>

          </div>

          <div className="machine-community-status">
            COMMUNITY CHANNEL
          </div>

        </div>

        <div className="machine-community-layout">

          {/* =================================================
              FORMULARIO
             ================================================= */}

          <form
            className="machine-community-form"
            onSubmit={
              handleCommentSubmit
            }
          >

            <div className="machine-public-field">

              <label htmlFor="comment-name">
                NOMBRE
              </label>

              <input
                id="comment-name"
                name="name"
                type="text"
                value={
                  commentForm.name
                }
                onChange={
                  handleCommentChange
                }
                maxLength={120}
                autoComplete="name"
                placeholder="TU NOMBRE"
                required
              />

            </div>

            <div className="machine-public-field">

              <label htmlFor="comment-email">
                CORREO ELECTRÓNICO
              </label>

              <input
                id="comment-email"
                name="email"
                type="email"
                value={
                  commentForm.email
                }
                onChange={
                  handleCommentChange
                }
                maxLength={254}
                autoComplete="email"
                placeholder="TU CORREO"
                required
              />

            </div>

            <div className="machine-public-field">

              <label htmlFor="comment-message">
                COMENTARIO
              </label>

              <textarea
                id="comment-message"
                name="message"
                value={
                  commentForm.message
                }
                onChange={
                  handleCommentChange
                }
                maxLength={2000}
                placeholder="ESCRIBE TU EXPERIENCIA CON MACHINE"
                required
              />

            </div>

            {commentError && (

              <div className="machine-public-error">
                {commentError}
              </div>

            )}

            {commentMessage && (

              <div className="machine-public-success">
                {commentMessage}
              </div>

            )}

            <button
              type="submit"
              className="machine-public-button"
              disabled={
                commentLoading
              }
            >

              {commentLoading
                ? "ENVIANDO..."
                : "PUBLICAR COMENTARIO"}

            </button>

          </form>

          {/* =================================================
              COMENTARIOS PUBLICADOS
             ================================================= */}

          <div className="machine-community-list">

            <div className="machine-community-list-header">

              <strong>
                COMENTARIOS DE LA COMUNIDAD
              </strong>

              <span>
                {comments.length}
              </span>

            </div>

            {comments.length === 0 ? (

              <div className="machine-community-empty">

                <div className="machine-empty-symbol notranslate" translate="no">
                  M
                </div>

                <strong>
                  AÚN NO HAY COMENTARIOS
                </strong>

                <p>
                  Sé uno de los primeros
                  en compartir tu experiencia
                  con MACHINE.
                </p>

              </div>

            ) : (

              <div className="machine-comment-items">

                {comments.map(
                  comment => (

                    <article
                      key={
                        comment.id
                      }
                      className="machine-comment-item"
                    >

                      <div className="machine-comment-top">

                        <strong>
                          {
                            comment.name
                          }
                        </strong>

                        <span>
                          {
                            new Date(
                              comment.created_at
                            ).toLocaleDateString(
                              "es-UY"
                            )
                          }
                        </span>

                      </div>

                      <p>
                        {
                          comment.message
                        }
                      </p>

                    </article>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          SOPORTE
         ===================================================== */}

      <section
        id="soporte"
        className="machine-section machine-support-section"
      >

        <span className="machine-section-label">
          06 · SUPPORT
        </span>

        <div className="machine-section-heading">

          <div>

            <span className="machine-community-code">
              MACHINE / SUPPORT
            </span>

            <h2>
              SOPORTE
            </h2>

            <p className="machine-community-intro">
              ¿Necesitas información sobre MACHINE,
              disponibilidad, funciones o futuras versiones?
              Envíanos tu consulta.
            </p>

          </div>

          <div className="machine-community-status">
            SUPPORT CHANNEL
          </div>

        </div>

        <form
          className="machine-support-form"
          onSubmit={
            handleSupportSubmit
          }
        >

          <div className="machine-support-grid">

            <div className="machine-public-field">

              <label htmlFor="support-name">
                NOMBRE
              </label>

              <input
                id="support-name"
                name="name"
                type="text"
                value={
                  supportForm.name
                }
                onChange={
                  handleSupportChange
                }
                maxLength={120}
                autoComplete="name"
                placeholder="TU NOMBRE"
                required
              />

            </div>

            <div className="machine-public-field">

              <label htmlFor="support-email">
                CORREO ELECTRÓNICO
              </label>

              <input
                id="support-email"
                name="email"
                type="email"
                value={
                  supportForm.email
                }
                onChange={
                  handleSupportChange
                }
                maxLength={254}
                autoComplete="email"
                placeholder="TU CORREO"
                required
              />

            </div>

          </div>

          <div className="machine-public-field">

            <label htmlFor="support-subject">
              ASUNTO
            </label>

            <input
              id="support-subject"
              name="subject"
              type="text"
              value={
                supportForm.subject
              }
              onChange={
                handleSupportChange
              }
              maxLength={180}
              placeholder="¿EN QUÉ PODEMOS AYUDARTE?"
              required
            />

          </div>

          <div className="machine-public-field">

            <label htmlFor="support-message">
              MENSAJE
            </label>

            <textarea
              id="support-message"
              name="message"
              value={
                supportForm.message
              }
              onChange={
                handleSupportChange
              }
              maxLength={5000}
              placeholder="ESCRIBE TU CONSULTA"
              required
            />

          </div>

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
            className="machine-public-button"
            disabled={
              supportLoading
            }
          >

            {supportLoading
              ? "ENVIANDO..."
              : "ENVIAR SOLICITUD"}

          </button>

        </form>

      </section>

    </>
  );
}

export default PublicCommunitySupport;