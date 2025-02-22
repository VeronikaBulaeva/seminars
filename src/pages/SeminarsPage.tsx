import { FC, useEffect, useState } from "react";
import { SeminarType } from "@/types.ts";
import Fetch from "@/api.ts";
import Seminar from "@/components/Seminar/Seminar.tsx";
import styles from "./SeminarPage.module.css";
import Loader from "@/components/Loader/Loader.tsx";
import Close from "@/assets/close_square.svg";
import DefaultButton from "@/components/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/DefaultButton/types.ts";
import Modal from "@/components/Modal/Modal.tsx";

const SeminarsPage: FC = () => {
  const [seminars, setSeminars] = useState<SeminarType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalErrorActive, setModalErrorActive] = useState(false);

  const getSeminars = async () => {
    setIsLoading(true);
    try {
      const response = await Fetch<SeminarType[]>().finally(() =>
        setIsLoading(false),
      );
      setSeminars(response);
    } catch {
      setIsError(true);
    }
  };

  const deleteSeminar = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await Fetch<SeminarType>(id, "DELETE").finally(() =>
        setIsLoading(false),
      );
      // Изменение стейта при успешном ответе, чтобы не делать лишний запрос
      setSeminars((prevState) =>
        prevState.filter((el) => el.id !== response.id),
      );
    } catch {
      setModalErrorActive(true);
    }
  };

  const editSeminar = async (id: string, data: SeminarType) => {
    setIsLoading(true);
    try {
      const response = await Fetch<SeminarType>(id, "PUT", data).finally(() =>
        setIsLoading(false),
      );
      // Изменение стейта при успешном ответе, чтобы не делать лишний запрос
      setSeminars((prevState) =>
        prevState.map((el) => (el.id === response.id ? response : el)),
      );
    } catch {
      setModalErrorActive(true);
    }
  };

  useEffect(() => {
    getSeminars();
  }, []);

  const modalClosing = () => {
    setModalErrorActive(false);
  };

  return (
    <section className={styles.section}>
      {isLoading && <Loader />}
      {isError ? (
        <div className={styles.error}>
          <p>Не удалось получить список семинаров</p>
          <p>Пожалуйста, попробуйте ещё раз позже</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {seminars.map((seminar) => (
            <Seminar
              key={seminar.id}
              {...seminar}
              editItem={editSeminar}
              deleteItem={deleteSeminar}
            />
          ))}
        </div>
      )}

      <Modal active={modalErrorActive} onClose={modalClosing}>
        <button className={styles.modal__close} onClick={modalClosing}>
          <img className={styles.modal__img} src={Close} alt="close" />
        </button>
        <p className={styles.modal__text}>
          {`Произошла непредвиденная ошибка.\nПовторите попытку позже.`}
        </p>
        <div className={styles.modal__bottom}>
          <DefaultButton
            className={styles.button}
            buttonType={ButtonType.button}
            onClick={modalClosing}
          >
            Cansel
          </DefaultButton>
        </div>
      </Modal>
    </section>
  );
};

export default SeminarsPage;
