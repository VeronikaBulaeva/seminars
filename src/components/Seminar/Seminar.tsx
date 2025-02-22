import { FC, useRef, useState } from "react";
import { SeminarType } from "@/types.ts";
import styles from "./Seminar.module.css";
import Modal from "@/components/Modal/Modal.tsx";
import Close from "@/assets/close_square.svg";
import DefaultButton from "@/components/DefaultButton/DefaultButton.tsx";
import { ButtonType } from "@/components/DefaultButton/types.ts";

type SeminarProps = {
  deleteItem: (id: string) => void;
  editItem: (id: string, data: SeminarType) => void;
};

const Seminar: FC<SeminarType & SeminarProps> = (props) => {
  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [modalEditActive, setModalEditActive] = useState(false);

  const { id, time, date, title, description, photo, editItem, deleteItem } =
    props;

  const ref = useRef<SeminarType>({
    id,
    time,
    date,
    title,
    description,
    photo,
  });

  const modalClosing = () => {
    setModalDeleteActive(false);
    setModalEditActive(false);
  };

  return (
    <div className={`${styles.box} ${styles.grid}`}>
      <p className={styles.title}>Тема: {title}</p>
      <div className={styles.seminar}>
        <div className={styles.seminar__text}>
          <div className={styles.date__block}>
            <p className={styles.date}>Дата:</p>
            <div className={`${styles.flex}`}>
              <p className={styles.date}>
                {date} {time}
              </p>
            </div>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
        <img className={styles.image} width={250} src={photo} alt="photo" />
      </div>

      <Modal active={modalDeleteActive} onClose={modalClosing}>
        <div className={styles.modal}>
          <button className={styles.modal__close} onClick={modalClosing}>
            <img className={styles.modal__img} src={Close} alt="close" />
          </button>
          <p className={styles.modal__text}>
            Вы уверены, что хотите удалить семинар?
          </p>
          <div className={styles.modal__bottom}>
            <DefaultButton
              className={styles.button}
              buttonType={ButtonType.button}
              onClick={modalClosing}
            >
              Отмена
            </DefaultButton>
            <DefaultButton
              className={styles.button}
              buttonType={ButtonType.button}
              onClick={() => {
                deleteItem(id);
                modalClosing();
              }}
            >
              Удалить
            </DefaultButton>
          </div>
        </div>
      </Modal>

      <Modal active={modalEditActive} onClose={modalClosing}>
        <div className={styles.modal}>
          <button className={styles.modal__close} onClick={modalClosing}>
            <img className={styles.modal__img} src={Close} alt="close" />
          </button>
          <div className={styles.grid}>
            <div className={styles.flex}>
              <p>Тема:</p>
              <input
                className={styles.input}
                defaultValue={title}
                onChange={(event) => {
                  ref.current.title = event.target.value;
                }}
              />
            </div>
            <div className={styles.flex}>
              <p>Дата:</p>
              <input
                className={styles.input}
                defaultValue={date}
                onChange={(event) => {
                  ref.current.date = event.target.value;
                }}
              />
            </div>
            <div className={styles.flex}>
              <p>Время:</p>
              <input
                className={styles.input}
                defaultValue={time}
                onChange={(event) => {
                  ref.current.time = event.target.value;
                }}
              />
            </div>
            <div className={styles.flex}>
              <p>Описание:</p>
              <input
                className={styles.input}
                defaultValue={description}
                onChange={(event) => {
                  ref.current.description = event.target.value;
                }}
              />
            </div>
          </div>
          <div className={styles.modal__bottom}>
            <DefaultButton
              className={styles.button}
              buttonType={ButtonType.button}
              onClick={modalClosing}
            >
              Отмена
            </DefaultButton>
            <DefaultButton
              className={styles.button}
              buttonType={ButtonType.button}
              onClick={() => {
                editItem(id, ref.current);
                modalClosing();
              }}
            >
              Изменить
            </DefaultButton>
          </div>
        </div>
      </Modal>

      <div className={styles.buttons__box}>
        <DefaultButton
          className={styles.button}
          buttonType={ButtonType.button}
          onClick={() => setModalEditActive(true)}
        >
          Изменить
        </DefaultButton>
        <DefaultButton
          className={styles.button}
          buttonType={ButtonType.button}
          onClick={() => setModalDeleteActive(true)}
        >
          Удалить
        </DefaultButton>
      </div>
    </div>
  );
};

export default Seminar;
